        import { NextResponse } from 'next/server';
        import { getMatches } from '../../lib/providers';
        import { buildFrameImageHtml } from '../../lib/render';

        export async function GET(req) {
          const url = new URL(req.url);
          const provider = url.searchParams.get('provider') ?? process.env.PROVIDER ?? 'mock';
          const sport = url.searchParams.get('sport') ?? 'soccer';
          const league = url.searchParams.get('league') ?? undefined;
          const team = url.searchParams.get('team') ?? undefined;
          const page = parseInt(url.searchParams.get('page') ?? '0', 10) || 0;

          const { matches, total } = await getMatches({ provider, sport, leagueFilter: league, teamFilter: team, page, pageSize: 5 });

          const imageHtml = buildFrameImageHtml(matches, { title: `${sport.charAt(0).toUpperCase()+sport.slice(1)} Live Scores`, total, page });
          const metaTemplate = `<!doctype html><html><head>
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="data:text/html;charset=utf-8,${encodeURIComponent(imageHtml)}">
<meta name="fc:frame:button:1" content="Refresh">
<meta name="fc:frame:button:2" content="More Matches">
<meta name="fc:frame:post_url" content="${url.origin}/api/action">
</head><body>Live Scores Frame Preview</body></html>`;

          return new Response(metaTemplate, { headers: { 'Content-Type': 'text/html' } });
        }

        export async function POST(req) {
          return GET(req);
        }
