import { firebaseConfig } from "../firebase-config.js";

const VERSION = "10.14.1";
const CDN = `https://www.gstatic.com/firebasejs/${VERSION}`;

export function isConfigured() {
  const c = firebaseConfig || {};
  return ["apiKey", "projectId", "appId"].every(
    (k) => typeof c[k] === "string" && c[k] && !c[k].startsWith("PASTE")
  );
}

let appPromise;
function loadApp() {
  if (!isConfigured()) return Promise.reject(Object.assign(new Error("not-configured"), { code: "not-configured" }));
  if (!appPromise) {
    appPromise = import(`${CDN}/firebase-app.js`).then(({ initializeApp }) => initializeApp(firebaseConfig));
  }
  return appPromise;
}

let dbPromise;
export function loadDb() {
  if (!dbPromise) {
    dbPromise = Promise.all([loadApp(), import(`${CDN}/firebase-firestore.js`)]).then(([app, fs]) => ({
      fs,
      db: fs.getFirestore(app),
    }));
  }
  return dbPromise;
}

let authPromise;
export function loadAuth() {
  if (!authPromise) {
    authPromise = Promise.all([loadApp(), import(`${CDN}/firebase-auth.js`)]).then(([app, au]) => ({
      au,
      auth: au.getAuth(app),
    }));
  }
  return authPromise;
}
