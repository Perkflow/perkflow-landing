/**
 * @fileoverview Universal Next.js API Proxy Handler
 * @description A flexible proxy handler that works with all Next.js route patterns
 *
 * @example
 * // Basic usage in /api/[...slug]/route.ts
 * export { GET, POST, PUT, DELETE, PATCH, OPTIONS } from '@/lib/proxy-handler';
 *
 * @example
 * // Custom configuration
 * const handler = createProxyHandler({ requireAuth: true });
 * export async function GET(req: NextRequest, ctx: RouteContext) {
 *   return handler(req, ctx);
 * }
 */

import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route context type for Next.js dynamic routes
 * @typedef {Object} RouteContext
 * @property {Promise<Record<string, string | string[]>>} params - Dynamic route parameters
 */
export type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * Configuration options for the proxy handler
 * @typedef {Object} ProxyConfig
 * @property {string} [baseURL] - Base URL for the target API (defaults to NEXT_PUBLIC_HOST)
 * @property {string[]} [skipHeaders] - Additional headers to skip when proxying
 * @property {Function} [transformRequest] - Function to transform the request before proxying
 * @property {Function} [transformResponse] - Function to transform the response after proxying
 * @property {boolean} [requireAuth] - Whether authentication is required for this endpoint
 * @property {Function} [pathBuilder] - Custom function to build the target URL path
 * @property {string} [staticPath] - Static path to append to baseURL (for non-dynamic routes)
 */
export type ProxyConfig = {
  baseURL?: string;
  skipHeaders?: string[];
  transformRequest?: (
    req: NextRequest,
    url: string,
  ) => Promise<{ url: string; headers?: Headers }>;
  transformResponse?: (response: Response) => Promise<Response>;
  requireAuth?: boolean;
  pathBuilder?: (
    req: NextRequest,
    params: Record<string, string | string[]>,
  ) => string;
  staticPath?: string;
};

/**
 * Base URL for the target API server
 * @constant {string|undefined}
 */
const baseURL = process.env.NEXT_PUBLIC_HOST;

if (!baseURL) {
  console.error("NEXT_PUBLIC_HOST is not defined in environment variables");
}

/**
 * Creates CORS headers for cross-origin requests
 * @returns {Record<string, string>} CORS headers object
 */
const createCorsHeaders = (): Record<string, string> => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

/**
 * Creates filtered headers for the proxy request
 * @param {NextRequest} request - The incoming Next.js request
 * @param {string[]} skipHeaders - Additional headers to skip
 * @param {boolean} includeHost - Whether to include the host header
 * @returns {Headers} Filtered headers object
 *
 * @description
 * Filters out problematic headers that can cause issues when proxying:
 * - host: Original request host, replaced with backend host
 * - content-length: Recalculated by fetch
 * - referer: Internal frontend routing information
 * - origin: Can cause CORS issues if forwarded
 */
const createHeaders = (
  request: NextRequest,
  skipHeaders: string[] = [],
  includeHost = true,
): Headers => {
  const defaultSkipHeaders = ["host", "content-length", "referer", "origin"];
  const allSkipHeaders = [...defaultSkipHeaders, ...skipHeaders];

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!allSkipHeaders.includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  if (includeHost && baseURL) {
    headers.set("host", new URL(baseURL).host);
  }

  return headers;
};

/**
 * Extracts authentication token from request
 * @param {NextRequest} req - The incoming Next.js request
 * @returns {string} Authentication token or empty string
 *
 * @description
 * Checks for authentication token in multiple locations:
 * 1. Authorization header (Bearer token)
 * 2. access_token cookie
 * 3. token cookie
 */
const extractToken = (req: NextRequest): string => {
  return (
    req.headers.get("authorization")?.split(" ")[1] ||
    req.cookies.get("access_token")?.value ||
    req.cookies.get("token")?.value ||
    ""
  );
};

/**
 * Builds the final response with proper headers
 * @param {Response} response - The response from the target API
 * @returns {Promise<NextResponse>} Next.js response with CORS headers
 *
 * @description
 * Processes the target API response and adds:
 * - CORS headers for cross-origin support
 * - Important response headers from the target API
 * - Proper content type handling (JSON vs text)
 */
const buildResponse = async (response: Response): Promise<NextResponse> => {
  const resText = await response.text();
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const proxyResponse = isJson
    ? NextResponse.json(JSON.parse(resText), { status: response.status })
    : new NextResponse(resText, { status: response.status });

  // Forward important response headers
  const headersToForward = [
    "content-type",
    "cache-control",
    "etag",
    "last-modified",
    "set-cookie",
  ];

  headersToForward.forEach((header) => {
    const value = response.headers.get(header);
    if (value) {
      proxyResponse.headers.set(header, value);
    }
  });

  Object.entries(createCorsHeaders()).forEach(([key, value]) => {
    proxyResponse.headers.set(key, value);
  });

  return proxyResponse;
};

/**
 * Builds error response from Axios errors
 * @param {unknown} error - The error object
 * @returns {NextResponse} Error response with CORS headers
 */
const buildAxiosErrorResponse = (error: unknown): NextResponse => {
  type ErrorResponseData = {
    errors?: { message: string }[];
    message?: string;
    error?: string;
  };

  const axiosError = error as AxiosError<ErrorResponseData>;
  const data = axiosError?.response?.data;

  const message =
    data?.errors?.[0]?.message ||
    data?.message ||
    data?.error ||
    "Oops! Something went wrong, please try again";

  const status = axiosError?.response?.status || 500;

  const response = NextResponse.json(
    { success: false, error: message },
    { status },
  );

  Object.entries(createCorsHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
};

/**
 * Creates a proxy handler with the specified configuration
 * @param {ProxyConfig} config - Configuration options for the proxy
 * @returns {Function} Proxy handler function
 *
 * @description
 * Creates a flexible proxy handler that can work with different URL patterns:
 * - [...slug] catch-all routes
 * - Static routes
 * - Single/multiple dynamic parameters
 * - Custom path building logic
 *
 * @example
 * // Basic proxy for [...slug] routes
 * const handler = createProxyHandler();
 *
 * @example
 * // Authenticated endpoint
 * const handler = createProxyHandler({ requireAuth: true });
 *
 * @example
 * // Static path
 * const handler = createProxyHandler({ staticPath: '/users' });
 *
 * @example
 * // Custom path building
 * const handler = createProxyHandler({
 *   pathBuilder: (req, params) => `/user/${params.id}/posts`
 * });
 */
export function createProxyHandler(config: ProxyConfig = {}) {
  return async function proxyHandler(
    request: NextRequest,
    context?: RouteContext,
  ) {
    try {
      const token = extractToken(request);

      const targetBaseURL = config.baseURL || baseURL;

      if (!targetBaseURL) {
        throw new Error("Base URL not configured");
      }

      // Auth check if required
      if (config.requireAuth && !token) {
        return NextResponse.json(
          { success: false, error: "Authentication required" },
          { status: 401 },
        );
      }

      let url: string;

      // Handle different URL construction strategies
      if (config.staticPath) {
        // For static paths like /api/users/route.ts -> /users
        url = `${targetBaseURL}${config.staticPath}${request.nextUrl.search}`;
      } else if (config.pathBuilder && context) {
        // Custom path building logic
        const params = await context.params;
        const path = config.pathBuilder(request, params);
        url = `${targetBaseURL}${path}${request.nextUrl.search}`;
      } else if (context) {
        // Default: handle [...slug] pattern
        const params = await context.params;
        const slug = params.slug as string[];
        if (!slug || !Array.isArray(slug)) {
          throw new Error("Invalid slug parameter");
        }
        url = `${targetBaseURL}/${slug.join("/")}${request.nextUrl.search}`;
      } else {
        // Fallback: use the current pathname
        const pathname = new URL(request.url).pathname.replace(/^\/api/, "");
        url = `${targetBaseURL}${pathname}${request.nextUrl.search}`;
      }

      let headers = createHeaders(request, config.skipHeaders);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // Apply request transformation if provided
      if (config.transformRequest) {
        const transformed = await config.transformRequest(request, url);
        url = transformed.url;
        if (transformed.headers) {
          headers = transformed.headers;
        }
      }

      // Prepare request body for methods that support it
      let body: BodyInit | undefined;
      if (["POST", "PUT", "PATCH"].includes(request.method)) {
        const contentType = request.headers.get("content-type");

        if (contentType?.includes("application/json")) {
          body = JSON.stringify(await request.json());
        } else if (contentType?.includes("multipart/form-data")) {
          body = await request.formData();
        } else if (contentType?.includes("application/x-www-form-urlencoded")) {
          body = await request.text();
        } else {
          body = await request.arrayBuffer();
        }
      }

      const response = await fetch(url, {
        method: request.method,
        headers,
        body,
        cache: "no-store",
      });

      // Apply response transformation if provided
      const finalResponse = config.transformResponse
        ? await config.transformResponse(response)
        : response;

      return await buildResponse(finalResponse);
    } catch (error: unknown) {
      console.error(`Proxy ${request.method} Error:`, error);

      if (error instanceof Error && error.message.includes("Base URL")) {
        return NextResponse.json(
          { success: false, error: "Service configuration error" },
          { status: 503 },
        );
      }

      return buildAxiosErrorResponse(error);
    }
  };
}

// =============================================================================
// DEFAULT HANDLERS - Ready to use for [...slug] routes
// =============================================================================

/**
 * Default proxy handler for [...slug] routes
 * @constant {Function}
 */
const defaultProxyHandler = createProxyHandler();

/**
 * GET request handler
 * @param {NextRequest} request - The incoming request
 * @param {RouteContext} [context] - Route context with parameters
 * @returns {Promise<NextResponse>} The proxy response
 */
export async function GET(request: NextRequest, context?: RouteContext) {
  return (await defaultProxyHandler)(request, context);
}

/**
 * POST request handler
 * @param {NextRequest} request - The incoming request
 * @param {RouteContext} [context] - Route context with parameters
 * @returns {Promise<NextResponse>} The proxy response
 */
export async function POST(request: NextRequest, context?: RouteContext) {
  return (await defaultProxyHandler)(request, context);
}

/**
 * PUT request handler
 * @param {NextRequest} request - The incoming request
 * @param {RouteContext} [context] - Route context with parameters
 * @returns {Promise<NextResponse>} The proxy response
 */
export async function PUT(request: NextRequest, context?: RouteContext) {
  return (await defaultProxyHandler)(request, context);
}

/**
 * DELETE request handler
 * @param {NextRequest} request - The incoming request
 * @param {RouteContext} [context] - Route context with parameters
 * @returns {Promise<NextResponse>} The proxy response
 */
export async function DELETE(request: NextRequest, context?: RouteContext) {
  return (await defaultProxyHandler)(request, context);
}

/**
 * PATCH request handler
 * @param {NextRequest} request - The incoming request
 * @param {RouteContext} [context] - Route context with parameters
 * @returns {Promise<NextResponse>} The proxy response
 */
export async function PATCH(request: NextRequest, context?: RouteContext) {
  return (await defaultProxyHandler)(request, context);
}

/**
 * OPTIONS request handler for CORS preflight requests
 * @param {NextRequest} request - The incoming request
 * @param {RouteContext} [context] - Route context with parameters
 * @returns {Promise<NextResponse>} CORS preflight response
 *
 * @description
 * Handles CORS preflight requests that browsers send before making
 * "complex" requests (POST with JSON, custom headers, etc.).
 * Returns a 200 OK with CORS headers to allow the actual request.
 */
export async function OPTIONS(request: NextRequest, context?: RouteContext) {
  const response = new NextResponse(null, { status: 200 });
  Object.entries(createCorsHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// =============================================================================
// SPECIALIZED HANDLERS - For different URL patterns and use cases
// =============================================================================

/**
 * Creates a proxy handler for [...slug] routes (same as default)
 * @returns {Function} Proxy handler function
 *
 * @example
 * // /api/[...slug]/route.ts
 * const handler = createSlugProxyHandler();
 * export async function GET(req: NextRequest, ctx: RouteContext) {
 *   return handler(req, ctx);
 * }
 */
export const createSlugProxyHandler = () => createProxyHandler();

/**
 * Creates a proxy handler for static paths
 * @param {string} path - The static path to proxy to
 * @returns {Function} Proxy handler function
 *
 * @example
 * // /api/users/route.ts -> backend/users
 * const handler = createStaticProxyHandler('/users');
 * export async function GET(req: NextRequest) {
 *   return handler(req); // No context needed
 * }
 */
export const createStaticProxyHandler = (path: string) =>
  createProxyHandler({
    staticPath: path,
  });

/**
 * Creates a proxy handler for single dynamic parameter routes
 * @param {string} pathTemplate - Path template with {param} placeholders
 * @returns {Function} Proxy handler function
 *
 * @example
 * // /api/user/[id]/route.ts -> backend/user/{id}
 * const handler = createSingleParamProxyHandler('/user/{id}');
 * export async function GET(req: NextRequest, ctx: RouteContext) {
 *   return handler(req, ctx);
 * }
 */
export const createSingleParamProxyHandler = (pathTemplate: string) =>
  createProxyHandler({
    pathBuilder: (req, params) => {
      let path = pathTemplate;
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(
          `{${key}}`,
          Array.isArray(value) ? value.join("/") : value,
        );
      });
      return path;
    },
  });

/**
 * Creates a proxy handler for multiple dynamic parameter routes
 * @param {string} pathTemplate - Path template with {param} placeholders
 * @returns {Function} Proxy handler function
 *
 * @example
 * // /api/user/[userId]/posts/[postId]/route.ts -> backend/user/{userId}/posts/{postId}
 * const handler = createMultiParamProxyHandler('/user/{userId}/posts/{postId}');
 * export async function GET(req: NextRequest, ctx: RouteContext) {
 *   return handler(req, ctx);
 * }
 */
export const createMultiParamProxyHandler = (pathTemplate: string) =>
  createProxyHandler({
    pathBuilder: (req, params) => {
      let path = pathTemplate;
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(
          `{${key}}`,
          Array.isArray(value) ? value.join("/") : value,
        );
      });
      return path;
    },
  });

/**
 * Creates a proxy handler with custom path building logic
 * @param {Function} pathBuilder - Custom function to build the target path
 * @returns {Function} Proxy handler function
 *
 * @example
 * // Complex custom logic
 * const handler = createCustomProxyHandler((req, params) => {
 *   const userId = params.userId;
 *   const action = new URL(req.url).searchParams.get('action');
 *   return `/users/${userId}/${action || 'profile'}`;
 * });
 */
export const createCustomProxyHandler = (
  pathBuilder: (
    req: NextRequest,
    params: Record<string, string | string[]>,
  ) => string,
) => createProxyHandler({ pathBuilder });

/**
 * Creates a proxy handler for authenticated routes only
 * @param {Partial<ProxyConfig>} config - Additional configuration options
 * @returns {Function} Proxy handler function
 *
 * @example
 * // Require authentication
 * const handler = createAuthProxyHandler();
 * export async function GET(req: NextRequest, ctx: RouteContext) {
 *   return handler(req, ctx); // Returns 401 if no token
 * }
 */
export const createAuthProxyHandler = (config: Partial<ProxyConfig> = {}) =>
  createProxyHandler({
    requireAuth: true,
    ...config,
  });

/**
 * Creates a proxy handler for a specific service with custom base URL
 * @param {string} serviceBaseURL - Base URL for the target service
 * @param {Partial<ProxyConfig>} config - Additional configuration options
 * @returns {Function} Proxy handler function
 *
 * @example
 * // Different backend service
 * const handler = createServiceProxyHandler('https://analytics.api.com');
 * export async function GET(req: NextRequest, ctx: RouteContext) {
 *   return handler(req, ctx);
 * }
 */
export const createServiceProxyHandler = (
  serviceBaseURL: string,
  config: Partial<ProxyConfig> = {},
) =>
  createProxyHandler({
    baseURL: serviceBaseURL,
    ...config,
  });

/**
 * Creates a proxy handler with request/response transformation
 * @param {Object} transforms - Transformation functions
 * @param {Function} [transforms.request] - Request transformation function
 * @param {Function} [transforms.response] - Response transformation function
 * @returns {Function} Proxy handler function
 *
 * @example
 * // Add custom headers and modify response
 * const handler = createTransformProxyHandler({
 *   request: async (req, url) => ({
 *     url,
 *     headers: new Headers([['x-custom-header', 'value']])
 *   }),
 *   response: async (res) => {
 *     // Modify response if needed
 *     return res;
 *   }
 * });
 */
export const createTransformProxyHandler = (transforms: {
  request?: ProxyConfig["transformRequest"];
  response?: ProxyConfig["transformResponse"];
}) =>
  createProxyHandler({
    transformRequest: transforms.request,
    transformResponse: transforms.response,
  });
