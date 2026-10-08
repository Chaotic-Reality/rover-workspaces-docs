// Cloudflare adds this specific JavaScript Detection wrapper at the edge on
// custom domains. Ignore only that wrapper, never arbitrary scripts or content.
export function normalizeLiveHtml(html) {
  return html.replace(/\r\n/g, "\n").replace(
    /<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument\|\|\(a\.contentWindow&&a\.contentWindow\.document\);(?:(?!<\/script>)[\s\S])*?<\/script>(?=<\/body>)/g,
    (script) =>
      script.includes("window.__CF$cv$params=") &&
      script.includes("/cdn-cgi/challenge-platform/scripts/jsd/main.js")
        ? ""
        : script,
  );
}
