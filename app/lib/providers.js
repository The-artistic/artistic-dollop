const MOCK_MATCHES = [
  { id: 'm1', sport: 'soccer', home: 'Arsenal', away: 'Chelsea', score: '2 - 1', status: 'FT', league: 'Premier League' },
  { id: 'm2', sport: 'soccer', home: 'Real Madrid', away: 'Barcelona', score: '1 - 0', status: 'HT', league: 'LaLiga' },
  { id: 'm3', sport: 'soccer', home: 'Man City', away: 'Liverpool', score: '0 - 0', status: "20'", league: 'Premier League' },
  { id: 'n1', sport: 'basketball', home: 'Lakers', away: 'Bulls', score: '98 - 95', status: 'Q4 02:32', league: 'NBA' },
];

export async function getMatches({ provider, sport='soccer', leagueFilter, teamFilter, page=0, pageSize=10 } = {}) {
  // provider param can route to different provider functions; for now we mock multi-sport.
  let data = MOCK_MATCHES.filter(m => m.sport === sport);
  if (leagueFilter) data = data.filter(m => (m.league||'').toLowerCase().includes(leagueFilter.toLowerCase()));
  if (teamFilter) data = data.filter(m => (m.home+' '+m.away).toLowerCase().includes(teamFilter.toLowerCase()));
  const start = page * pageSize;
  return { matches: data.slice(start, start+pageSize), total: data.length };
}

export async function getMatchDetails(id) {
  return MOCK_MATCHES.find(m => m.id === id) ?? null;
}
