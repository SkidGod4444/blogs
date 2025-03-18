import { dub } from "@/lib/dub";

export async function POST(req: Request) {
    try {
        const { url, shortenSlug } = await req.json();

        if (!url || !shortenSlug) {
            return Response.json({ error: "Missing url or shorten slug!" }, { status: 400 });
        }

        const link = await dub.links.create({ 
            url: url,
            domain: "b.devwtf.in",
            key: shortenSlug
         });

        return Response.json(link.shortLink);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return Response.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const shortenSlug = searchParams.get("shortenSlug");

        if (!shortenSlug) {
            return Response.json({ error: "Missing shorten slug!" }, { status: 400 });
        }

        const link = await dub.links.get({ 
            domain: "b.devwtf.in",
            key: shortenSlug
         });

        return Response.json(link.shortLink);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return Response.json({ error: errorMessage }, { status: 500 });
    }
}