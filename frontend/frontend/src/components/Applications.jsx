import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Applications.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/applications/')
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1>Job Applications</h1>
        <Link to="/applications/create">
          <button>Add New Application</button>
        </Link>
      </div>
      <ul className="application-list">
        {applications.map((app) => (
          <li key={app.id} className="application-item">
            <span className="application-details">
              {app.position} at <span className="company-name">{app.company_name}</span>
              <span className="application-status">({app.status})</span>
            </span>
            <Link to={`/applications/${app.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
