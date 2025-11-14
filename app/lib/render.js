export function buildFrameImageHtml(matches, opts={}) {
  const title = opts.title || 'Live Scores';
  const page = opts.page || 0;
  let html = `<div style="font-family:system-ui,Arial;background:#071025;color:#fff;padding:16px;width:100%;box-sizing:border-box;">
    <div style="font-size:28px;font-weight:700;margin-bottom:8px;">⚽ ${escapeHtml(title)}</div>
    <div style="font-size:12px;opacity:0.85;margin-bottom:12px;">Updated live • Page ${page+1}</div>
    <div style="display:flex;flex-direction:column;gap:8px;">`;
  for (const m of matches) {
    html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-radius:10px;background:rgba(255,255,255,0.03);">
        <div style="font-size:14px;font-weight:700">${escapeHtml(m.home)} <span style="font-weight:400;">vs</span> ${escapeHtml(m.away)}</div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:800">${escapeHtml(m.score)}</div>
          <div style="font-size:12px;opacity:0.85">${escapeHtml(m.status||'')}</div>
        </div>
      </div>`;
  }
  html += `</div></div>`;
  return html;
}
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
