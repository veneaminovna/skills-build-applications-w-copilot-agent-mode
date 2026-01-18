import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching users from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users data received:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Processed users:', usersData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
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
        <div>Error loading users: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header mb-4">
        <h2><span className="me-2">👤</span>Users</h2>
        <p className="mb-0">Community members and fitness enthusiasts</p>
      </div>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || user.id || index}>
                  <td><span className="badge bg-secondary">{index + 1}</span></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                           style={{width: '32px', height: '32px', fontSize: '14px'}}>
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="fw-semibold">{user.username}</span>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="text-decoration-none">
                      {user.email}
                    </a>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-outline-primary btn-sm">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="empty-state">
          <div className="display-1">👤</div>
          <h4>No Users Found</h4>
          <p className="text-muted">Users will appear here once they register.</p>
        </div>
      )}

      <div className="mt-3 text-muted">
        <small>Total Users: {users.length}</small>
      </div>
    </div>
  );
}

export default Users;
