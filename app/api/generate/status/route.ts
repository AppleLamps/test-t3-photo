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

        const status = await fal.queue.status(modelEndpoint, {
            requestId,
            logs: true,
        });

        return NextResponse.json(status);
    } catch (error: any) {
        console.error("Status check error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to check status" },
            { status: 500 }
        );
    }
}
