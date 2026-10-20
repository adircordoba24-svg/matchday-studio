/* קובע את ערכת העיצוב של האתר (דף הלקוח ודף המדיניות).
   כדי לבחור ערכה קבועה, משנים את הערך כאן: 'gold' (זהב לילה) | 'pitch' (קו הדשא) | 'platinum' (פלטינה).
   לתצוגה מקדימה בלי לשנות: מוסיפים לכתובת ?theme=pitch (ועם &preview מופיע מחליף ערכות). */
(function () {
  var DEFAULT_THEME = 'gold';
  var t = new URLSearchParams(location.search).get('theme');
  var ok = ['gold', 'pitch', 'platinum'];
  document.documentElement.setAttribute('data-theme', ok.indexOf(t) > -1 ? t : DEFAULT_THEME);
})();
