import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Processed teams:', teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
        <div>Error loading teams: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header mb-4">
        <h2><span className="me-2">👥</span>Teams</h2>
        <p className="mb-0">Join a team and compete together</p>
      </div>

      <div className="row g-4">
        {teams.map((team, index) => (
          <div className="col-md-6 col-lg-4" key={team._id || team.id || index}>
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span><span className="me-2">👥</span>{team.name}</span>
                <span className="badge bg-light text-dark">
                  {team.members?.length || 0} members
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{team.description || 'No description available.'}</p>
                {team.members && team.members.length > 0 && (
                  <div className="mt-3">
                    <small className="text-muted d-block mb-2">Team Members:</small>
                    <div className="d-flex flex-wrap gap-1">
                      {team.members.slice(0, 5).map((member, idx) => (
                        <span key={idx} className="badge bg-secondary">
                          {member.username || member}
                        </span>
                      ))}
                      {team.members.length > 5 && (
                        <span className="badge bg-light text-dark">+{team.members.length - 5} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-primary btn-sm w-100">View Team Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="empty-state">
          <div className="display-1">👥</div>
          <h4>No Teams Found</h4>
          <p className="text-muted">Teams will appear here once they are created.</p>
          <button className="btn btn-primary">Create a Team</button>
        </div>
      )}

      <div className="mt-3 text-muted">
        <small>Total Teams: {teams.length}</small>
      </div>
    </div>
  );
}

export default Teams;
