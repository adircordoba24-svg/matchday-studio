// דחיסת תמונה בדפדפן לפני השמירה.
// כל תמונה נשמרת כמסמך נפרד ב-Firestore (מגבלה: 1MB למסמך), ולכן מכווצים ל-JPEG
// עד 2000px בצלע הארוכה, שזה יותר ממספיק לפוסטר 1080x1920.

export const MAX_BASE64_CHARS = 900000;

async function decode(file) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch (_) {
      /* ננסה דרך אלמנט img */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } catch (_) {
    throw Object.assign(new Error("image-decode"), { code: "image-decode" });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function compressImage(file, { maxSide = 2000, maxChars = MAX_BASE64_CHARS } = {}) {
  const src = await decode(file);
  const sw = src.width, sh = src.height;
  if (!sw || !sh) throw Object.assign(new Error("image-decode"), { code: "image-decode" });

  let scale = Math.min(1, maxSide / Math.max(sw, sh));
  let quality = 0.9;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  for (let attempt = 0; attempt < 14; attempt++) {
    const w = Math.max(1, Math.round(sw * scale));
    const h = Math.max(1, Math.round(sh * scale));
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = "#fff"; // רקע לבן עבור PNG שקוף
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(src, 0, 0, w, h);
    const url = canvas.toDataURL("image/jpeg", quality);
    const data = url.slice(url.indexOf(",") + 1);
    if (data.length <= maxChars) {
      if (src.close) src.close();
      return { data, width: w, height: h };
    }
    if (quality > 0.62) quality = Math.max(0.6, quality - 0.08);
    else scale *= 0.85;
  }
  if (src.close) src.close();
  throw Object.assign(new Error("image-too-large"), { code: "image-too-large" });
}
