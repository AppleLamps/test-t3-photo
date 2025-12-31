import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const requestId = searchParams.get("requestId");
        const modelEndpoint = searchParams.get("modelEndpoint");

        if (!requestId || !modelEndpoint) {
            return NextResponse.json(
                { error: "Missing requestId or modelEndpoint" },
                { status: 400 }
            );
        }

        if (!process.env.FAL_KEY) {
            return NextResponse.json(
                { error: "FAL_KEY not configured" },
                { status: 500 }
            );
        }

        fal.config({
            credentials: process.env.FAL_KEY,
        });

        const result = await fal.queue.result(modelEndpoint, {
            requestId,
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Result fetch error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch result" },
            { status: 500 }
        );
    }
}
