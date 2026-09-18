// Generates a small inline SVG data URI with a label printed on a brand-colored
// card. No network request is made, so it can never fail to load, be blocked
// by an ad blocker/firewall, or be slow — unlike a third-party image service.
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapLines(text, maxCharsPerLine = 16, maxLines = 3) {
  const words = String(text).split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = (current + ' ' + word).trim();
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current.trim());

  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,3}$/, '') + '…';
  }
  return lines;
}

export function placeholderImage(label, bg = '0f172a', fg = '38bdf8') {
  const lines = wrapLines(label);
  const lineHeight = 42;
  const startY = 300 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((line, i) => `<tspan x="300" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="#${bg}"/><text text-anchor="middle" dominant-baseline="middle" fill="#${fg}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${tspans}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
