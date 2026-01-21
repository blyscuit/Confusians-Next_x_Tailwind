import JSZip from "jszip";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const imageUrls = body.imageUrls;

    if (!Array.isArray(imageUrls)) {
      return NextResponse.json(
        { error: "imageUrls must be an array" },
        { status: 400 }
      );
    }

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { error: "imageUrls array is empty" },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    const origin = req.headers.get("origin");

    await Promise.all(
      imageUrls.map(async (url, index) => {
        const absoluteUrl = url.startsWith("http")
          ? url
          : `${origin}${url}`;

        const res = await fetch(absoluteUrl);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${absoluteUrl}`);
        }

        const buffer = await res.arrayBuffer();
        zip.file(`image-${index + 1}.jpg`, buffer);
      })
    );

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="images.zip"',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
