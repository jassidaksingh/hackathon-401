import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ResumeForm.css';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    template_file: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("template_file", formData.template_file);

    try {
      const response = await fetch("http://localhost:8000/api/resumes/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        navigate("/resumes");
      } else {
        console.error("Error uploading resume:", await response.json());
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="resume-form-container">
      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Resume Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Upload File:</label>
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, template_file: e.target.files[0] })
            }
            required
          />
        </div>
        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
};

export default ResumeForm;
