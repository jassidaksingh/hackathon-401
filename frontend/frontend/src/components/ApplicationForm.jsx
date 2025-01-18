import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    date_applied: '',
    status: 'APPLIED',
    notes: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/applications/${id}/`)
        .then((res) => res.json())
        .then((data) => setFormData(data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    fetch(`http://localhost:8000/api/applications/${id ? `${id}/` : ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => navigate('/applications'));
  };

  return (
    <form className="application-form-container" onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Application' : 'Add New Application'}</h1>
      <div className="application-form-grid">
        <div>
          <label className="application-form-label">Company Name:</label>
          <input
            type="text"
            className="application-form-input"
            value={formData.company_name}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
          />
        </div>
        <div>
          <label className="application-form-label">Position:</label>
          <input
            type="text"
            className="application-form-input"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
        </div>
        <div>
          <label className="application-form-label">Date Applied:</label>
          <input
            type="date"
            className="application-form-input"
            value={formData.date_applied}
            onChange={(e) =>
              setFormData({ ...formData, date_applied: e.target.value })
            }
          />
        </div>
        <div>
          <label className="application-form-label">Status:</label>
          <select
            className="application-form-input"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTION">Rejection</option>
          </select>
        </div>
      </div>
      <div className="application-form-grid full-width">
        <div>
          <label className="application-form-label">Notes:</label>
          <textarea
            className="application-form-input application-form-textarea"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>
      </div>
      <button type="submit" className="application-form-button">
        Save
      </button>
    </form>
  );
};

export default ApplicationForm;
