// Cloudflare adds this specific JavaScript Detection wrapper at the edge on
// custom domains. Ignore only that wrapper, never arbitrary scripts or content.
export function normalizeLiveHtml(html) {
  return html
    .replace(/\r\n/g, "\n")
    .replace(
      /<script(?: nonce="[A-Za-z0-9+/_=-]+")?>\(function\(\)\{function c\(\)\{var b=a\.contentDocument\|\|\(a\.contentWindow&&a\.contentWindow\.document\);(?:(?!<\/script>)[\s\S])*?<\/script>(?=<\/body>)/g,
      (script) =>
        script.includes("window.__CF$cv$params=") &&
        script.includes("/cdn-cgi/challenge-platform/scripts/jsd/main.js")
          ? ""
          : script,
    );
}

// Account state is private and rendered per request. Compare the static shell
// around this single reviewed slot; its behavior is checked in Worker tests.
export function normalizeAccountMenu(html) {
  return html.replace(
    /<!-- ROVER_ACCOUNT_START -->([\s\S]*?)<!-- ROVER_ACCOUNT_END -->/g,
    (slot, body) =>
      /<(?:script|iframe|object|embed)\b|\son\w+=/i.test(body)
        ? slot
        : "<!-- ROVER_ACCOUNT_START --><!-- ROVER_ACCOUNT_END -->",
  );
}
