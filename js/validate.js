import { LIMITS, STYLES, COMPETITIONS, LAYOUTS, BROADCASTS, byId } from "./data.js";

// ---------- טלפון ----------
// מקבל 050-1234567, 050 123 4567, +972 50-123-4567, 972501234567 ומחזיר 0501234567
export function normalizePhone(raw) {
  let d = String(raw ?? "").replace(/[\s\-().]/g, "");
  if (d.startsWith("+972")) d = "0" + d.slice(4);
  else if (d.startsWith("00972")) d = "0" + d.slice(5);
  else if (d.startsWith("972")) d = "0" + d.slice(3);
  return d;
}

// נייד ישראלי בלבד (05X + 7 ספרות), כי הקשר הוא בוואטסאפ
export const isValidIsraeliMobile = (p) => /^05\d{8}$/.test(p);

// ---------- קבצים ----------
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function checkImageFile(file) {
  if (!file || !ALLOWED_TYPES.includes(file.type)) return "סוג הקובץ לא נתמך. אפשר להעלות JPG, PNG או WEBP.";
  if (file.size === 0) return "הקובץ ריק.";
  if (file.size > LIMITS.maxFileBytes) return "הקובץ גדול מדי. הגודל המקסימלי הוא 8MB לתמונה.";
  return null;
}

// ---------- תאריך ----------
const pad = (n) => String(n).padStart(2, "0");
export function todayLocalISO(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function isRealDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

// ---------- ולידציה של הזמנה ----------
// v = ערכי הטופס (מחרוזות + rights/terms כבוליאן). מחזיר רשימת שגיאות לפי סדר השדות בטופס.
export function validateOrder(v, photoCount, today = todayLocalISO()) {
  const errors = [];
  const add = (field, msg) => errors.push({ field, msg });
  const s = (x) => String(x ?? "").trim();

  if (!s(v.styleId) || !byId(STYLES, s(v.styleId))) add("styleId", "בחרו סגנון עיצוב.");

  if (!s(v.player)) add("player", "נא למלא את שם השחקן.");
  else if (s(v.player).length > LIMITS.maxText) add("player", "שם השחקן ארוך מדי.");

  if (s(v.number) && !/^\d{1,3}$/.test(s(v.number))) add("number", "מספר החולצה צריך להיות מספר (עד 3 ספרות).");

  const phone = normalizePhone(v.contact);
  if (!s(v.contact)) add("contact", "נא למלא מספר טלפון.");
  else if (!isValidIsraeliMobile(phone)) add("contact", "מספר הטלפון צריך להיות נייד ישראלי, למשל 050-1234567.");

  for (const [f, label] of [["team", "קבוצת השחקן"], ["opponent", "הקבוצה היריבה"], ["venue", "האצטדיון"]]) {
    if (!s(v[f])) add(f, `נא למלא את ${label}.`);
    else if (s(v[f]).length > LIMITS.maxText) add(f, `השדה ${label} ארוך מדי.`);
  }

  if (!byId(COMPETITIONS, s(v.competition))) add("competition", "בחרו מסגרת משחק.");

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(s(v.time))) add("time", "נא למלא שעת משחק תקינה.");

  if (!isRealDate(s(v.date))) add("date", "נא למלא תאריך משחק תקין.");
  else if (s(v.date) < today) add("date", "תאריך המשחק כבר עבר. נא לבחור תאריך עתידי.");

  if (!byId(BROADCASTS, s(v.broadcast))) add("broadcast", "נא לבחור אם יש שידור למשחק.");
  if (s(v.broadcast) === "yes") {
    if (!s(v.broadcastChannel)) add("broadcastChannel", "נא לציין איזה ערוץ משדר.");
    else if (s(v.broadcastChannel).length > 60) add("broadcastChannel", "שם הערוץ ארוך מדי.");
  }

  const layout = byId(LAYOUTS, s(v.photoLayout || "designer"));
  if (!layout) add("photoLayout", "הרכב תמונות לא תקין.");

  if (photoCount < LIMITS.minPhotos) add("photos", "נא להעלות לפחות תמונה אחת.");
  else if (photoCount > LIMITS.maxPhotos) add("photos", "אפשר להעלות עד 3 תמונות.");
  else if (layout && photoCount < layout.min) {
    add("photos", layout.min === 3
      ? "לקולאז׳ שלוש תמונות צריך להעלות 3 תמונות."
      : "להרכב פורטרט וצילום פעולה צריך להעלות 2 תמונות.");
  }

  if (s(v.notes).length > LIMITS.maxNotes) add("notes", "ההערות ארוכות מדי (עד 2000 תווים).");

  if (!v.rights) add("rights", "יש לאשר שיש לכם רשות להשתמש בתמונות.");
  if (!v.terms) add("terms", "יש לאשר את שמירת החומרים ופרטי הקשר.");

  return errors;
}

// ---------- בניית מסמך ההזמנה (בלי createdAt, שמתווסף בשרת) ----------
export function buildOrderDoc(v, photoCount) {
  const s = (x) => String(x ?? "").trim();
  const style = byId(STYLES, s(v.styleId));
  const competition = byId(COMPETITIONS, s(v.competition));
  const broadcast = s(v.broadcast);
  return {
    player: s(v.player),
    number: s(v.number),
    contact: normalizePhone(v.contact),
    team: s(v.team),
    opponent: s(v.opponent),
    competition: competition.id,
    competitionLabel: competition.he,
    venue: s(v.venue),
    time: s(v.time),
    date: s(v.date),
    broadcast,
    broadcastChannel: broadcast === "yes" ? s(v.broadcastChannel) : "",
    photoLayout: s(v.photoLayout || "designer"),
    styleId: style.id,
    styleName: `${style.code} ${style.en}`,
    photoCount,
    notes: s(v.notes),
    rights: true,
    terms: true,
    status: "new",
  };
}
