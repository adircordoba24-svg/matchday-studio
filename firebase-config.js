// ============================================================
//  MATCHDAY STUDIO - הגדרות האתר
//  ממלאים פעם אחת. פירוט מלא בקובץ SETUP.md
// ============================================================

// 1) פרטי חיבור ל-Firebase (Project settings > Your apps > Web app > Config)
//    אלה לא סיסמאות. הם גלויים לכל אתר שמשתמש ב-Firebase.
//    ההגנה האמיתית נמצאת בחוקים (firestore.rules) ובהתחברות של המנהל.
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_APP_ID",
};

export const SITE = {
  // שם העסק כפי שיופיע במדיניות הפרטיות (אופציונלי)
  businessName: "MATCHDAY STUDIO",

  // המייל היחיד שמורשה להיכנס לדף הניהול.
  // חשוב: אותו מייל מופיע גם בקובץ firestore.rules, וההגנה האמיתית היא שם.
  adminEmail: "adir.cordoba24@gmail.com",

  // מספר הוואטסאפ שלך בפורמט בינלאומי, בלי + ובלי מקפים (058-431-0304 = 972584310304).
  // הוא מופיע ללקוח רק אחרי שליחת הזמנה (כפתור וואטסאפ) ובדף מדיניות הפרטיות. אין אותו בפרומפט.
  ownerWhatsapp: "972584310304",

  // התראה במייל על כל הזמנה חדשה, דרך EmailJS (אופציונלי, חינמי עד 200 מיילים בחודש).
  // משאירים ריק כדי לא להשתמש. ההתראה לא כוללת טלפון ולא תמונות.
  emailNotify: {
    serviceId: "",
    templateId: "",
    publicKey: "",
  },
};
