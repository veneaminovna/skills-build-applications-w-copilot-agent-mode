import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge bg-warning text-dark fs-6">🥇 1st</span>;
    if (rank === 2) return <span className="badge bg-secondary fs-6">🥈 2nd</span>;
    if (rank === 3) return <span className="badge bg-danger fs-6">🥉 3rd</span>;
    return <span className="badge bg-light text-dark">{rank}</span>;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <span className="me-2">⚠️</span>
        <div>Error loading leaderboard: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header mb-4">
        <h2><span className="me-2">🏆</span>Leaderboard</h2>
        <p className="mb-0">See who's leading the fitness challenge</p>
      </div>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" className="text-center">Rank</th>
                <th scope="col">User</th>
                <th scope="col" className="text-end">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id || index} className={index < 3 ? 'table-active' : ''}>
                  <td className="text-center">{getRankBadge(index + 1)}</td>
                  <td>
                    <span className="fw-semibold">{entry.user?.username || entry.user}</span>
                  </td>
                  <td className="text-end">
                    <span className="badge bg-success fs-6">{entry.score} pts</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {leaderboard.length === 0 && (
        <div className="empty-state">
          <div className="display-1">🏆</div>
          <h4>No Leaderboard Entries</h4>
          <p className="text-muted">Complete activities to appear on the leaderboard!</p>
        </div>
      )}

      <div className="mt-3 text-muted">
        <small>Total Participants: {leaderboard.length}</small>
      </div>
    </div>
  );
}

export default Leaderboard;
