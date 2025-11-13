import { NextRequest, NextResponse } from "next/server";
import { extractErrorMsg } from "@/lib/error";

const BACKEND_URL = "https://sandboxapi.perkflow.io/v1";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log("📧 Received from frontend:", payload);

    if (
      !payload?.first_name ||
      !payload?.last_name ||
      !payload?.email ||
      !payload?.message
    ) {
      return NextResponse.json(
        { message: "First name, last name, email and message are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const backendPayload = {
      full_name: `${payload.first_name} ${payload.last_name}`.trim(),
      email: payload.email,
      phone: payload.phone || "",
      message: payload.message,
    };

    const res = await fetch(`${BACKEND_URL}/requests/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendPayload),
    });

    console.log("📡 Backend response status:", res.status);

    if (!res.ok) {
      let errorMessage = "Failed to send message";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = `Backend error: ${res.status} ${res.statusText}`;
      }

      return NextResponse.json(
        { message: errorMessage },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: extractErrorMsg(error),
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
