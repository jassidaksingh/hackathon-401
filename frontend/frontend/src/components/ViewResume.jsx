import React from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ViewResume = () => {
  const { id } = useParams();

  // Construct the PDF URL
  const resumeUrl = `http://localhost:8000/media/resumes/${id}.pdf`;

  return (
    <div>
      <h1>View Resume</h1>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
        <Viewer fileUrl={resumeUrl} />
      </Worker>
    </div>
  );
};

export default ViewResume;
