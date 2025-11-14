import React from 'react';
import { getMatches } from './lib/providers';

export default async function Page() {
  const { matches } = await getMatches({ sport: 'soccer', page: 0, pageSize: 10 });
  return (
    <main style={{padding:20, background:'#071025', minHeight:'100vh', color:'#fff'}}>
      <h1 style={{fontSize:24, fontWeight:800}}>Live Scores — Preview</h1>
      <div style={{marginTop:16, display:'grid', gap:12}}>
        {matches.map(m => (
          <div key={m.id} style={{padding:12, borderRadius:12, background:'rgba(255,255,255,0.03)', display:'flex', justifyContent:'space-between'}}>
            <div>
              <div style={{fontWeight:700}}>{m.home} <span style={{fontWeight:400}}>vs</span> {m.away}</div>
              <div style={{fontSize:12, opacity:0.9}}>{m.league} • {m.status}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:800}}>{m.score}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:24}}>
        <a href="/admin" style={{color:'#7dd3fc'}}>Open Admin Dashboard</a>
      </div>
    </main>
  );
}
