// Resolve a media URL from Payload CMS or already-proxied path
// Returns a string URL or null if not resolvable
export function resolveMediaUrl(imageSrc?: string | null): string | null {
  if (!imageSrc) return null;
  // Absolute URL (S3/CloudFront/CMS) — use as-is
  if (imageSrc.startsWith("http")) return imageSrc;
  // Already proxied through Next API
  if (imageSrc.startsWith("/api/")) return imageSrc;

  // If Payload returns a stored path like `uploads/abc.jpg`, try CloudFront/S3 first
  let path = imageSrc.startsWith("/") ? imageSrc.slice(1) : imageSrc;

  // Payload sometimes returns values such as `media/uploads/foo.jpg`; strip the
  // redundant `media/` prefix so our `/api/media` proxy doesn't become
  // `/api/media/media/...` and 404.
  if (path.startsWith("media/")) {
    path = path.slice("media/".length);
  }
  const cloudfront = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
  let s3Endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT;
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET;
  const region = process.env.NEXT_PUBLIC_S3_REGION;

  const trim = (s?: string | null) => (s ? s.replace(/\/+$/, "") : s);

  const withProtocol = (u?: string | null) => {
    if (!u) return u as any;
    const t = u.trim();
    if (!t) return t;
    if (t.startsWith("http://") || t.startsWith("https://")) return t;
    return `https://${t}`;
  };

  if (cloudfront) {
    return `${trim(cloudfront)}/${path}`;
  }
  if (s3Endpoint) {
    const endpoint = trim(withProtocol(s3Endpoint));
    const hasBucket = bucket && endpoint?.includes(bucket);
    return `${endpoint}${hasBucket ? "" : bucket ? `/${bucket}` : ""}/${path}`;
  }
  if (bucket && region) {
    return `https://${bucket}.s3.${region}.amazonaws.com/${path}`;
  }

  // Fallback to proxy route in dev/unknown env
  return `/api/media/${path}`;
}
