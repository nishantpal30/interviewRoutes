const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;",
};

export const escapeHtml = (value = "") =>
  String(value ?? "").replace(/[&<>"'`]/g, (ch) => HTML_ESCAPES[ch]);