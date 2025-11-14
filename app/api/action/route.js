        import { verifySignature } from '../../lib/verify';
        import { getMatches } from '../../lib/providers';
        import { buildFrameImageHtml } from '../../lib/render';

        export async function POST(req) {
          const raw = await req.text();
          const headers = req.headers;
          const ok = verifySignature(raw, headers, {});
          if (!ok) {
            return new Response('Signature verification failed', { status: 401 });
          }
          let payload = {};
          try { payload = JSON.parse(raw); } catch (e) { payload = {}; }
          const action = payload.action ?? payload.button ?? 'refresh';
          const page = parseInt(String(payload.page ?? '0'), 10) || 0;
          const nextPage = action === 'more' || action === 'More Matches' ? page + 1 : 0;
          const { matches } = await getMatches({ page: nextPage, pageSize: 5 });
          const imageHtml = buildFrameImageHtml(matches, { title: 'Live Scores', page: nextPage });
          const resHtml = `<!doctype html><html><head>
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="data:text/html;charset=utf-8,${encodeURIComponent(imageHtml)}">
<meta name="fc:frame:button:1" content="Refresh">
<meta name="fc:frame:button:2" content="More Matches">
<meta name="fc:frame:post_url" content="${new URL(req.url).origin}/api/action">
</head><body>Updated frame</body></html>`;
          return new Response(resHtml, { headers: { 'Content-Type': 'text/html' } });
        }
