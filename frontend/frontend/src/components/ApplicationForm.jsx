import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    fetch(`http://localhost:8000/api/applications/${id || ''}/`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => navigate('/applications'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          value={formData.company_name}
          onChange={(e) =>
            setFormData({ ...formData, company_name: e.target.value })
          }
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
        />
      </label>
      <label>
        Date Applied:
        <input
          type="date"
          value={formData.date_applied}
          onChange={(e) =>
            setFormData({ ...formData, date_applied: e.target.value })
          }
        />
      </label>
      <label>
        Status:
        <select
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
      </label>
      <label>
        Notes:
        <textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ApplicationForm;
