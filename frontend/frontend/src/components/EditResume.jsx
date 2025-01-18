import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    template_file: null,
  });

  // Fetch resume details when component loads
  useEffect(() => {
    fetch(`http://localhost:8000/api/resumes/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({ name: data.name, template_file: null });
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.template_file) {
      data.append("template_file", formData.template_file);
    }

    const response = await fetch(`http://localhost:8000/api/resumes/${id}/`, {
      method: "PUT",
      body: data,
    });

    if (response.ok) {
      alert("Resume updated successfully!");
      navigate("/resumes");
    } else {
      alert("Error updating resume.");
    }
  };

  return (
    <div>
      <h1>Edit Resume</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Resume Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Replace File (optional):
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, template_file: e.target.files[0] })
            }
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditResume;
