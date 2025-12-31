import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { modelEndpoint, input } = body;

        if (!process.env.FAL_KEY) {
            return NextResponse.json(
                { error: "FAL_KEY not configured" },
                { status: 500 }
            );
        }

        // Configure fal client
        fal.config({
            credentials: process.env.FAL_KEY,
        });

        // Submit to queue
        const { request_id } = await fal.queue.submit(modelEndpoint, {
            input,
        });

        return NextResponse.json({ requestId: request_id });
    } catch (error: any) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to start generation" },
            { status: 500 }
        );
    }
}
