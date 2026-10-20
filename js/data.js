// נתונים משותפים לדף הלקוח, לדף הניהול ולבונה הפרומפט.
// שינוי כאן משתנה בשני הדפים. אם משנים מזהים (id), צריך לעדכן גם את firestore.rules.

export const LIMITS = {
  minPhotos: 1,
  maxPhotos: 3,
  maxFileBytes: 8 * 1024 * 1024,
  maxText: 100,
  maxNotes: 2000,
};

export const STYLES = [
  {
    id: "md01", code: "MD01", en: "STADIUM LIGHTS", he: "אצטדיון וכחול דרמטי",
    brief: "Dramatic night-stadium atmosphere: deep blue palette, floodlight beams and light haze, high contrast, cinematic depth.",
  },
  {
    id: "md02", code: "MD02", en: "CLEAN PRO", he: "נקי, בהיר ומדויק",
    brief: "Clean, bright and precise: light background, generous white space, strict grid, one accent color taken from the club colors, sharp modern typography.",
  },
  {
    id: "md03", code: "MD03", en: "URBAN GRIT", he: "אופי מחוספס",
    brief: "Rough urban character: concrete and paper textures, film grain, scratched and torn edges, dark charcoal and deep burgundy palette, bold condensed type.",
  },
  {
    id: "md04", code: "MD04", en: "NEON NIGHT", he: "לילה ונגיעות ניאון",
    brief: "Night-city mood with restrained neon: deep violet and teal glow accents, glossy highlights, thin light lines. Neon is used only as accents and the photo stays natural.",
  },
  {
    id: "md05", code: "MD05", en: "CLUB PRIDE", he: "צבעי המועדון",
    brief: "Built entirely from the club colors: bold diagonal color blocking, strong geometric shapes, club-colored typography. Use the real colors of the player's team.",
  },
  {
    id: "md06", code: "MD06", en: "EDITORIAL", he: "קומפוזיציית מגזין",
    brief: "Sports-magazine cover composition: large typographic hierarchy, tight crop on the player, muted stone background, thin rules and small captions.",
  },
];

export const COMPETITIONS = [
  { id: "leumit", he: "ליגה לאומית" },
  { id: "premier", he: "ליגת העל" },
  { id: "state-cup", he: "גביע המדינה" },
];

export const LAYOUTS = [
  {
    id: "designer", he: "לבחירת המעצב", min: 1,
    brief: "Choose the strongest composition for the supplied photos.",
  },
  {
    id: "single", he: "צילום אחד", min: 1,
    brief: "Single hero photo of the player, large, as the main visual of the poster.",
  },
  {
    id: "double", he: "פורטרט וצילום פעולה", min: 2,
    brief: "Two photos: one portrait of the player and one action shot, combined into one poster composition.",
  },
  {
    id: "triple", he: "קולאז׳ שלוש תמונות — פנים ושתי תמונות פעולה או עמידה", min: 3,
    brief: "Three-photo collage: one face/portrait photo plus two action or standing photos, balanced into one poster composition.",
  },
];

export const BROADCASTS = [
  { id: "yes", he: "יש שידור" },
  { id: "no", he: "אין שידור" },
];

export const STATUSES = [
  { id: "new", he: "חדש" },
  { id: "progress", he: "בטיפול" },
  { id: "done", he: "נמסר" },
  { id: "cancelled", he: "בוטל" },
];

export const byId = (list, id) => list.find((x) => x.id === id);

// ---------------------------------------------------------------
//  לוגואים ב-Google Drive (המקור לסוכן שמכין את העיצוב)
//  מבנה התיקיות כפי שהוא היום:
//    MATCHDAY STUDIO /
//      04 — סמלי קבוצות /  <שם הקבוצה>.png   (קובץ אחד לכל קבוצה, בשם המדויק של הקבוצה)
//      לוגו ליגה לאומית.png                  (לוגו ליגה, בתיקייה הראשית)
//  כשמוסיפים קבוצה או לוגו ל-Drive, מוסיפים את השם גם כאן.
// ---------------------------------------------------------------
export const DRIVE = {
  root: "MATCHDAY STUDIO",
  teamsFolder: "04 \u2014 \u05E1\u05DE\u05DC\u05D9 \u05E7\u05D1\u05D5\u05E6\u05D5\u05EA", // "04 — סמלי קבוצות" (מקף ארוך)
  competitionsFolder: "\u05DE\u05E1\u05D2\u05E8\u05EA \u05DE\u05E9\u05D7\u05E7", // "מסגרת משחק"
  // שמות הקבצים כפי שהם בדרייב, בתיקיית "מסגרת משחק"
  competitionFiles: {
    leumit: "\u05DC\u05D5\u05D2\u05D5 \u05DC\u05D9\u05D2\u05D4 \u05DC\u05D0\u05D5\u05DE\u05D9\u05EA.png", // לוגו ליגה לאומית.png
    premier: "\u05DC\u05D9\u05D2\u05EA \u05D4\u05E2\u05DC.png", // ליגת העל.png
    "state-cup": "\u05D2\u05D1\u05D9\u05E2 \u05D4\u05DE\u05D3\u05D9\u05E0\u05D4 (JPG)", // גביע המדינה (קובץ JPG, בלי סיומת בשם)
  },
};

// קבצי הסמלים שקיימים כרגע בתיקיית סמלי הקבוצות (ללא סיומת .png)
export const TEAM_LOGOS = [
  "הפועל ראשון לציון", "הפועל רעננה", "מ.ס. קריית ים", "מ.ס. כפר קאסם", "מכבי אחי נצרת",
  "עירוני מודיעין", "מכבי בני ריינה", "הפועל כפר סבא", "הפועל עכו", "הפועל כפר שלם",
  "מ.ס. אשדוד", "מכבי הרצליה", "בית״ר ירושלים", "הפועל באר שבע", "הפועל חיפה",
  "הפועל ירושלים", "הפועל פתח תקווה", "מכבי חיפה", "מכבי נתניה", "מכבי פתח תקווה",
  "מכבי תל אביב", "עירוני קריית שמונה", "עירוני טבריה", "בני סכנין", "מכבי יפו",
  "הפועל עפולה", "מכבי קריית גת", "בני יהודה תל אביב", "הפועל תל אביב", "הפועל רמת גן",
];

// אילו לוגואי מסגרות כבר קיימים ב-Drive. כשמעלים את הקובץ ל-Drive, משנים ל-true.
export const COMPETITION_LOGOS = { leumit: true, premier: true, "state-cup": true };

// השוואה סלחנית: בלי רווחים, גרשיים, נקודות ומקפים, כדי ש-בית"ר ירושלים ו-בית״ר ירושלים יהיו זהים
export const normName = (s) => String(s ?? "").replace(/[\s"'\u05F4\u05F3\u201C\u201D\u2019`.\-\u05BE]/g, "").toLowerCase();

// מחזיר את שם הקובץ המדויק (ללא .png) אם יש סמל לקבוצה, אחרת null
export function findTeamLogo(name) {
  const n = normName(name);
  if (!n) return null;
  return TEAM_LOGOS.find((t) => normName(t) === n) || null;
}
