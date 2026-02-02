import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

// if (!BACKEND_URL) {
//   throw new Error("BACKEND_URL is not defined in .env.local");
// }

// GET /api/survey → Spring Boot GET /survey
export async function GET() {
    try {
    console.log(">> get : " + `${BACKEND_URL}`);
        if (!BACKEND_URL) {
            console.log(">> NOT BACKEND_URL");
        return NextResponse.json(
        { message: "BACKEND_URL is not defined" },
        { status: 500 }
        );
    }
    const res = await fetch(`${BACKEND_URL}/dummy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

        if (!res.ok) {
        console.log(">> NOT GET API");
      return NextResponse.json(
        { message: "Failed to fetch survey" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/survey → Spring Boot POST /survey/make-result
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/survey/make-result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to make survey result" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
