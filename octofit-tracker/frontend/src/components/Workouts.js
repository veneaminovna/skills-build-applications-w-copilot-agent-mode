import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'easy': 'bg-success',
      'medium': 'bg-warning text-dark',
      'hard': 'bg-danger'
    };
    return badges[difficulty?.toLowerCase()] || 'bg-secondary';
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
        <div>Error loading workouts: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header mb-4">
        <h2><span className="me-2">💪</span>Workouts</h2>
        <p className="mb-0">Explore workout routines to achieve your fitness goals</p>
      </div>

      <div className="row g-4">
        {workouts.map((workout, index) => (
          <div className="col-md-6 col-lg-4" key={workout._id || workout.id || index}>
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span><span className="me-2">💪</span>{workout.name}</span>
                {workout.difficulty && (
                  <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                )}
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description || 'No description available.'}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <span className="badge bg-info text-dark me-2">
                      ⏱️ {workout.duration} min
                    </span>
                    {workout.calories && (
                      <span className="badge bg-warning text-dark">
                        🔥 {workout.calories} cal
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-primary btn-sm w-100">Start Workout</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {workouts.length === 0 && (
        <div className="empty-state">
          <div className="display-1">💪</div>
          <h4>No Workouts Found</h4>
          <p className="text-muted">Workout routines will appear here once they are added.</p>
          <button className="btn btn-primary">Add a Workout</button>
        </div>
      )}

      <div className="mt-3 text-muted">
        <small>Total Workouts: {workouts.length}</small>
      </div>
    </div>
  );
}

export default Workouts;
