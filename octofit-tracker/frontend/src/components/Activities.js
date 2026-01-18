import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed activities:', activitiesData);
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
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
        <div>Error loading activities: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header mb-4">
        <h2><span className="me-2">📊</span>Activities</h2>
        <p className="mb-0">Track and monitor all fitness activities</p>
      </div>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id || activity.id || index}>
                  <td><span className="badge bg-secondary">{index + 1}</span></td>
                  <td>
                    <span className="fw-semibold">{activity.user?.username || activity.user}</span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">{activity.activity_type}</span>
                  </td>
                  <td>{activity.duration} min</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activities.length === 0 && (
        <div className="empty-state">
          <div className="display-1">📊</div>
          <h4>No Activities Found</h4>
          <p className="text-muted">Activities will appear here once they are logged.</p>
        </div>
      )}

      <div className="mt-3 text-muted">
        <small>Total Activities: {activities.length}</small>
      </div>
    </div>
  );
}

export default Activities;
