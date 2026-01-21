document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("downloadZip");
  if (!button) return;

  button.addEventListener("click", function () {
    const imagesAttr = button.getAttribute("data-images");

    let imageUrls;
    try {
      imageUrls = JSON.parse(imagesAttr);
    } catch (e) {
      console.error("Invalid data-images JSON");
      return;
    }

    downloadZip(imageUrls);
  });
});

function downloadZip(imageUrls) {
  fetch("/api/zip-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrls }),
  })
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.zip";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    });
}
