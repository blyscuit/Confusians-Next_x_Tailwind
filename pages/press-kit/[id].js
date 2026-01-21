import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"

import steamPresskit from "../../db/steam_presskit.json"
import catalog from "../../db/catalog.json"

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

export default function PressKitPage() {
  const router = useRouter()
  const { id } = router.query

  const entry = catalog[id]
  const presskit = steamPresskit[id]

  const images = entry?.image || []
  const branding = presskit?.branding || []
  const video = entry?.video

  const [imageSize, setImageSize] = useState(0)
  const [brandingSize, setBrandingSize] = useState(0)

  /* -------- redirect if presskit missing -------- */

  useEffect(() => {
    if (!router.isReady) return

    if (!presskit) {
      router.replace("/")
    }
  }, [router.isReady, presskit])

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

  if (!router.isReady || !presskit || !entry) return null

  const combinedSize = imageSize + brandingSize

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">{id} – Press Kit</h1>

      {/* 1–2 VIDEO */}
      {video && (
        <section>
          <h2 className="text-xl font-semibold mb-2 text-foreground">Video</h2>
          <video controls className="w-full rounded-md border border-border">
            <source src={video} />
          </video>

          <a
            href={video}
            download
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Download Video
          </a>
        </section>
      )}


      {/* 9–10 ALL ASSETS */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-foreground">All Assets</h2>

        <button
          onClick={() =>
            downloadZip(`${id}-all-assets`, [...images, ...branding])
          }
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          Download All Images
        </button>

        <p className="text-sm text-muted-foreground mt-2">
          Total size: {formatBytes(combinedSize)}
        </p>
      </section>

      {/* 3–5 IMAGES */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-foreground">Screenshots</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src) => (
            <img key={src} src={src} className="rounded-md border border-border" />
          ))}
        </div>

        <div className="mt-3 flex gap-4 items-center">
          <button
            onClick={() => downloadZip(`${id}-images`, images)}
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Download Screenshots
          </button>

          <span className="text-sm text-muted-foreground">
            Total size: {formatBytes(imageSize)}
          </span>
        </div>
      </section>

      {/* 6–8 BRANDING */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-foreground">Branding</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {branding.map((src) => (
            <img key={src} src={src} className="rounded-md border border-border" />
          ))}
        </div>

        <div className="mt-3 flex gap-4 items-center">
          <button
            onClick={() => downloadZip(`${id}-branding`, branding)}
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Download Branding
          </button>

          <span className="text-sm text-muted-foreground">
            Total size: {formatBytes(brandingSize)}
          </span>
        </div>
      </section>
    </div>
  )
}
