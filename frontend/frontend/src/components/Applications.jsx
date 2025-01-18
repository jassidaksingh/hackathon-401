import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/applications/')
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <div>
      <h1>Job Applications</h1>
      <Link to="/applications/create">Add New Application</Link>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.position} at {app.company_name} ({app.status})
            <Link to={`/applications/${app.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
