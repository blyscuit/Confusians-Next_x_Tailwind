import { useState, useEffect } from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"

import steamPresskit from "../../db/steam_presskit.json"
import catalog from "../../db/catalog.json"

import Layout from "../../components/MyLayout"
import Head from "next/head"

/* ---------------- helpers ---------------- */

async function fetchSize(url) {
  try {
    const res = await fetch(url, { method: "HEAD" })
    const size = res.headers.get("content-length")
    return size ? Number(size) : 0
  } catch {
    return 0
  }
}

function formatBytes(bytes) {
  if (!bytes) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

async function downloadZip(name, urls) {
  const zip = new JSZip()

  await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url)
      const blob = await res.blob()
      const filename = url.split("/").pop()
      zip.file(filename, blob)
    })
  )

  const content = await zip.generateAsync({ type: "blob" })
  saveAs(content, `${name}.zip`)
}

/* ---------------- page ---------------- */

export default function PressKitPage({ id }) {
  const entry = catalog[id]
  const presskit = steamPresskit[id]

  const images = entry?.image || []
  const branding = presskit?.branding || []
  const video = entry?.video

  const [imageSize, setImageSize] = useState(0)
  const [brandingSize, setBrandingSize] = useState(0)

  /* -------- size calculation -------- */

  useEffect(() => {
    if (!images.length) return
    Promise.all(images.map(fetchSize)).then((sizes) =>
      setImageSize(sizes.reduce((a, b) => a + b, 0))
    )
  }, [images])

  useEffect(() => {
    if (!branding.length) return
    Promise.all(branding.map(fetchSize)).then((sizes) =>
      setBrandingSize(sizes.reduce((a, b) => a + b, 0))
    )
  }, [branding])

  /* -------- prevent render during redirect -------- */

  if (!presskit || !entry) return null

  const combinedSize = imageSize + brandingSize

  return (
    <div className={entry.backgroundColor}>
      <Layout
        backdrop={(entry.textColor || "").includes("lighten") ? "dark" : "light"}
      >
        <Head>
          <title>{entry.name || ""} | Confusians</title>
          <meta
            name="description"
            content={entry.name + " | " + (entry.about || "")}
          />
        </Head>

        <div className="flex flex-col items-center pb-10">
          <div className="flex flex-col px-6 py-16 w-full">
            <h1 className={"text-6xl pb-4 text-center " + entry.textColor}>
              {entry.name} – Press Kit
            </h1>

            {/* 1–2 VIDEO */}
            {video && (
              <div className="w-full sm:w-full md:max-w-5xl mx-auto px-6 py-10">
                <section>
                  <h2 className={"text-xl font-semibold mb-2 " + entry.textColor}>Video</h2>
                  <video controls className="w-full rounded-md border border-border">
                    <source src={video} />
                  </video>

                  <a
                    href={video}
                    download
                    className={
                      "px-6 py-3 border border-current rounded hover:opacity-80 " +
                      entry.textColor
                    }
                  >
                    Download Video
                  </a>
                </section>
              </div>
            )}

            {/* 9–10 ALL ASSETS */}
            <div className="w-full sm:w-full md:max-w-5xl mx-auto px-6 py-10">
              <section>
                <h2 className={"text-xl font-semibold mb-2 " + entry.textColor}>All Assets</h2>

                <button
                  onClick={() =>
                    downloadZip(`${id}-all-assets`, [...images, ...branding])
                  }
                  className={
                    "px-6 py-3 border border-current rounded hover:opacity-80 " +
                    entry.textColor
                  }
                >
                  Download All Images
                </button>

                <p className={"text-sm mt-2 " + entry.textColor}>
                  Total size: {formatBytes(combinedSize)}
                </p>
              </section>
            </div>

            {/* 3–5 IMAGES */}
            <div className="w-full sm:w-full md:max-w-5xl mx-auto px-6 py-10">
              <section>
                <h2 className={"text-xl font-semibold mb-2 " + entry.textColor}>Screenshots</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((src) => (
                    <img key={src} src={src} className="rounded-md border border-border" />
                  ))}
                </div>

                <div className="mt-3 flex gap-4 items-center">
                  <button
                    onClick={() => downloadZip(`${id}-images`, images)}
                    className={
                      "px-6 py-3 border border-current rounded hover:opacity-80 " +
                      entry.textColor
                    }
                  >
                    Download Screenshots
                  </button>

                  <span className={entry.textColor}>
                    Total size: {formatBytes(imageSize)}
                  </span>
                </div>
              </section>
            </div>

            {/* 6–8 BRANDING */}
            <div className="w-full sm:w-full md:max-w-5xl mx-auto px-6 py-10">
              <section>
                <h2 className={"text-xl font-semibold mb-2 " + entry.textColor}>Branding</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {branding.map((src) => (
                    <img key={src} src={src} className="rounded-md border border-border" />
                  ))}
                </div>

                <div className="mt-3 flex gap-4 items-center">
                  <button
                    onClick={() => downloadZip(`${id}-branding`, branding)}
                    className={
                      "px-6 py-3 border border-current rounded hover:opacity-80 " +
                      entry.textColor
                    }
                  >
                    Download Branding
                  </button>

                  <span className={entry.textColor}>
                    Total size: {formatBytes(brandingSize)}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params

  const presskit = steamPresskit[id]
  const entry = catalog[id]

  if (!presskit) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (!entry) {
    return { notFound: true }
  }

  return {
    props: { id },
  }
}

export async function getStaticPaths() {
  const ids = Object.keys(steamPresskit)

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  }
}
