import { STYLES, LAYOUTS, byId } from "./data.js";
import { logoInfo } from "./prompts.js";

const fmtDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || "";
};

// סיכום בעברית לקובץ order-details.txt שבתוך ה-ZIP
export function buildDetails(o, ref = "") {
  const style = byId(STYLES, o.styleId);
  const layout = byId(LAYOUTS, o.photoLayout);
  const bc = o.broadcast === "yes" ? `יש שידור (${o.broadcastChannel})` : "אין שידור";
  const L = logoInfo(o);
  const lg = (x) => (x.file ? `נמצא ב-Drive (${x.path})` : "לא נמצא קובץ מתאים, הסוכן יחפש לפי שם");
  return [
    `הזמנה ${ref}`.trim(),
    `---------------------------`,
    `שחקן: ${o.player}${o.number ? ` (#${o.number})` : ""}`,
    `טלפון: ${o.contact}`,
    `קבוצה: ${o.team}`,
    `יריבה: ${o.opponent}`,
    `מסגרת: ${o.competitionLabel}`,
    `אצטדיון: ${o.venue}`,
    `תאריך (לתיאום בלבד): ${fmtDate(o.date)}`,
    `שעה: ${o.time}`,
    `שידור: ${bc}`,
    `סגנון: ${style ? `${style.code} ${style.en} - ${style.he}` : o.styleName}`,
    `הרכב תמונות: ${layout ? layout.he : o.photoLayout}`,
    `מספר תמונות: ${o.photoCount}`,
    `הערות: ${o.notes || "-"}`,
    `לוגו קבוצה: ${lg(L.team)}`,
    `לוגו יריבה: ${lg(L.opponent)}`,
    `לוגו מסגרת: ${L.competition.inDrive ? `נמצא ב-Drive (${L.competition.path})` : `חסר ב-Drive (${L.competition.path})`}`,
  ].join("\n");
}

export { fmtDate };
