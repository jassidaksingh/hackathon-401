import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    template_file: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for file uploads
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
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, template_file: e.target.files[0] })
          }
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ResumeForm;
