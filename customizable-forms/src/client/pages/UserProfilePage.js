import React, { useEffect, useState } from "react";
import api from "../services/api";

const UserProfilePage = () => {
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    api.get("/api/get/templates")
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error("Error fetching user templates:", error);
      });

      
    api.get("/user/forms")
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error("Error fetching user forms:", error);
      });
  }, []);

  return (
    <div className="user-profile-page">
      <h1>Your Templates</h1>
      <div className="templates-list">
        {templates.length ? (
          templates.map(template => (
            <div key={template.id} className="template-card">
              <h2>{template.title}</h2>
              <p>{template.description}</p>
            </div>
          ))
        ) : (
          <p>You haven't created any templates yet.</p>
        )}
      </div>

      <h1>Your Forms</h1>
      <div className="forms-list">
        {forms.length ? (
          forms.map(form => (
            <div key={form.id} className="form-card">
              <p>Form ID: {form.id}</p>
              <p>Template: {form.templateTitle}</p>
              <p>Submission Date: {form.submittedAt}</p>
            </div>
          ))
        ) : (
          <p>You haven't submitted any forms yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
