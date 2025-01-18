import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResponseForm = () => {
  const [formData, setFormData] = useState({
    job_application: '',
    response_type: 'INTERVIEW',
    response_date: '',
    comments: '',
  });
  const navigate = useNavigate();
  const { id, applicationId } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/responses/${id}/`)
        .then((res) => res.json())
        .then((data) => setFormData(data));
    } else if (applicationId) {
      setFormData({ ...formData, job_application: applicationId });
    }
  }, [id, applicationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    fetch(`http://localhost:8000/api/responses/${id || ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => navigate(`/responses/${formData.job_application}`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Response Type:
        <select
          value={formData.response_type}
          onChange={(e) =>
            setFormData({ ...formData, response_type: e.target.value })
          }
        >
          <option value="INTERVIEW">Interview</option>
          <option value="REJECTION">Rejection</option>
          <option value="OFFER">Offer</option>
        </select>
      </label>
      <label>
        Response Date:
        <input
          type="date"
          value={formData.response_date}
          onChange={(e) =>
            setFormData({ ...formData, response_date: e.target.value })
          }
        />
      </label>
      <label>
        Comments:
        <textarea
          value={formData.comments}
          onChange={(e) =>
            setFormData({ ...formData, comments: e.target.value })
          }
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ResponseForm;
