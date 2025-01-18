
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Resumes.css';

const Resumes = () => {
  const [masterResume, setMasterResume] = useState(null);
  const [otherResumes, setOtherResumes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/resumes/')
      .then((res) => res.json())
      .then((data) => {
        const master = data.find((resume) => resume.is_master);
        const others = data.filter((resume) => !resume.is_master);
        setMasterResume(master);
        setOtherResumes(others);
      });
  }, []);

  return (
    <div className="resumes-container">
      <div className="resumes-header">
        <h1>Resumes</h1>
        <Link to="/resumes/create" className="upload-button">Upload New Resume</Link>
      </div>

      {masterResume && (
        <div className="resume-section master-resume">
          <h2>Master Resume</h2>
          <div className="resume-item">
            <span className="resume-name">{masterResume.name}</span>
            <div className="resume-actions">
              <a 
                href={masterResume.template_file} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-link"
              >
                View
              </a>
              <Link to={`/resumes/${masterResume.id}/edit`} className="edit-link">
                Edit
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="resume-section">
        <h2>Other Resumes</h2>
        <ul className="resume-list">
          {otherResumes.map((resume) => (
            <li key={resume.id} className="resume-item">
              <span className="resume-name">{resume.name}</span>
              <div className="resume-actions">
              <a
                href={`http://localhost:8000/media/${resume.template_file}`}
                target="_blank"
                rel="noopener noreferrer"
                >
                View Resume
                </a>
                {' '}
              |{' '}
              <Link to={`http://localhost:8000/media/resumes/${resume.id}/edit`}>Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resumes;