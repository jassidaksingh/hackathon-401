import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResumeForm = () => {
  const [formData, setFormData] = useState({ name: '', template_file: null });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/resumes/${id}/`)
        .then((res) => res.json())
        .then((data) => setFormData({ name: data.name }));
    }
  }, [id]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, template_file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    if (formData.template_file) {
      formDataObj.append('template_file', formData.template_file);
    }

    const method = id ? 'PUT' : 'POST';
    fetch(`http://localhost:8000/api/resumes/${id || ''}`, {
      method,
      body: formDataObj,
    }).then(() => navigate('/resumes'));
  };

  return (
    <form className='container'onSubmit={handleSubmit}>
      <label>
        Resume Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </label>
      <label>
        Upload File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ResumeForm;
