import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Resumes = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/resumes/')
      .then((res) => res.json())
      .then((data) => setResumes(data));
  }, []);

  return (
    <div>
      <h1>Resumes</h1>
      <Link to="/resumes/create">Upload New Resume</Link>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>
            {resume.name}
            <a href={resume.template_file} target="_blank" rel="noopener noreferrer">
              View
            </a>
            <Link to={`/resumes/${resume.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resumes;
