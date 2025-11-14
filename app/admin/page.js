'use client';
import React, { useState } from 'react';

// Very small in-memory admin UI (client-only) for demo purposes.
export default function Admin() {
  const [rows, setRows] = useState([{ id:'m1', sport:'soccer', home:'Arsenal', away:'Chelsea', score:'2 - 1', status:'FT' }]);

  function addMock() {
    setRows([...rows, { id: 'm'+(rows.length+1), sport:'soccer', home:'TeamA', away:'TeamB', score:'0 - 0', status:'NS' }]);
  }
  return (
    <main style={{padding:20, background:'#071025', minHeight:'100vh', color:'#fff'}}>
      <h1 style={{fontSize:20, fontWeight:800}}>Admin Dashboard (Demo)</h1>
      <p style={{opacity:0.9}}>This is an in-memory demo admin. Add / remove items here for preview only.</p>
      <div style={{marginTop:12}}>
        <button onClick={addMock} style={{padding:'8px 12px', background:'#0ea5a9', borderRadius:8}}>Add Mock Match</button>
      </div>
      <div style={{marginTop:16, display:'grid', gap:8}}>
        {rows.map(r => (
          <div key={r.id} style={{padding:10, borderRadius:10, background:'rgba(255,255,255,0.03)', display:'flex', justifyContent:'space-between'}}>
            <div>{r.home} vs {r.away} • {r.status}</div>
            <div>{r.score}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
