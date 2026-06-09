import React, { useState, useEffect } from 'react';

export default function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=4328')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server.');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.events) {
          setMatches(data.events);
        } else {
          setMatches([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>SCOREBOARD</h1>
        <div className="subtitle">PREMIERE LEAGUE — LIVE PREMIERE LEAGUE MATCH RESULT</div>
      </header>

      {loading && <div className="loading">Menghubungkan ke API dan memuat skor...</div>}
      
      {error && <div className="loading" style={{ color: 'red' }}>Error: {error}</div>}

      {!loading && !error && (
        <table className="score-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>TANGGAL</th>
              <th style={{ textAlign: 'right' }}>KANDANG</th>
              <th style={{ textAlign: 'center' }}>SKOR</th>
              <th style={{ textAlign: 'left' }}>TANDANG</th>
            </tr>
          </thead>
          <tbody>
            {matches.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Tidak ada data pertandingan terbaru.
                </td>
              </tr>
            ) : (
              matches.map((match) => (
                <tr key={match.idEvent}>
                  {}
                  <td className="status">{match.dateEventLocal || match.strDate}</td>
                  <td className="team-home">{match.strHomeTeam}</td>
                  <td className="score-cell">
                    {match.intHomeScore} - {match.intAwayScore}
                  </td>
                  <td className="team-away">{match.strAwayTeam}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}