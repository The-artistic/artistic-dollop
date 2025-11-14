import { getMatchDetails } from '../../../lib/providers';

export async function GET(req, { params }) {
  const id = params.id;
  const match = await getMatchDetails(id);
  if (!match) return new Response('Not found', { status: 404 });
  return new Response(JSON.stringify(match), { headers: { 'Content-Type': 'application/json' } });
}
