import { NextResponse } from "next/server";
import { STRAPI_CACHE_TAG } from "@/lib/strapi";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
    const secret = request.headers.get("authorization");

    if (secret !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }

    const body = await request.json().catch(() => null);

    revalidateTag(STRAPI_CACHE_TAG, "max");

    return NextResponse.json({
        revalidated: true,
        tag: STRAPI_CACHE_TAG,
        event: body?.event ?? null,
        model: body?.model ?? null,
        now: Date.now(),
    });
}