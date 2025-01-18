import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Job Tracker</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Welcome to Job Tracker! This application was created to streamline your job search process 
            and help you stay organized during your career journey. Whether you're actively job hunting 
            or just keeping track of potential opportunities, we've got you covered.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Smart Application Tracking</h3>
              <p>Keep track of every application with details like company name, position, application date, and current status.</p>
            </div>
            <div className="feature-card">
              <h3>Resume Management</h3>
              <p>Upload and maintain different versions of your resume for different job types. Never lose track of which version you sent where.</p>
            </div>
            <div className="feature-card">
              <h3>Interview Tracking</h3>
              <p>Log all your interviews, feedback, and follow-ups in one centralized location.</p>
            </div>
            <div className="feature-card">
              <h3>Application Status</h3>
              <p>Monitor the progress of each application from submission to offer or rejection.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Collaborators</h2>
          <p>
            This project was built as part of the Winter 2025 Hackathon. A heartfelt thank you to our amazing contributors for their dedication and effort in bringing this app to life:
          </p>
          <ul>
            <li>Jastegh Singh </li>
            <li>Shikar Arora </li>
            <li>Iftemum Raain </li>
            <li>Jassidak Singh </li>
            <li>Joshua Jimmy</li>
            <li>Luisa Bertoli de Simone</li>
            <li>Aykhan Teymurlu</li>
          </ul>
          <p>
            We also extend our gratitude to the hackathon organizers and mentors for their invaluable guidance.
          </p>
        </section>

        <section className="about-section">
          <h2>Built With</h2>
          <div className="tech-stack">
            <span className="tech-item">React</span>
            <span className="tech-item">Django</span>
            <span className="tech-item">REST API</span>
            <span className="tech-item">SQLite</span>
            <span className="tech-item">CSS3</span>
            <span className="tech-item">Python</span>
            <span className="tech-item">JavaScript</span>
          </div>
        </section>

        <section className="about-section">
          <h2>Get Started</h2>
          <p>
            Ready to organize your job search? Start by creating an account and uploading your first resume. 
            Then, begin tracking your applications and watching your job search progress in real-time.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 