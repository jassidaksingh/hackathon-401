import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="container">
      <h1>Resumes</h1>
      <Link to="/resumes/create">Upload New Resume</Link>
      {masterResume && (
        <div>
          <h2>Master Resume</h2>
          <p>{masterResume.name}</p>
          <a href={masterResume.template_file} target="_blank" rel="noopener noreferrer">
            View Master Resume
          </a>
          <Link to={`Http://localhost:8000/resumes/${masterResume.id}/edit`}>Edit</Link>
        </div>
      )}

      <h2>Other Resumes</h2>
      <ul>
        {otherResumes.map((resume) => (
          <li key={resume.id}>
            <span>{resume.name}</span>
            <div>
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
  );
};

export default Resumes;
