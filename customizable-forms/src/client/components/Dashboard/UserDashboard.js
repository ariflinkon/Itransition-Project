import React, { useEffect, useState } from "react";
import api from "../../services/api";

const UserDashboard = () => {
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);

  
  useEffect(() => {
    api.get("/api/get/templates")
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error("Error fetching templates:", error);
      });

    api.get("/user/forms")
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error("Error fetching forms:", error);
      });
  }, []);

  return (
    <div className="user-dashboard">
      <h1>Your Dashboard</h1>
      <div className="dashboard-section">
        <h2>Your Templates</h2>
        <div className="templates-list">
          {templates.length ? (
            templates.map(template => (
              <div key={template.id} className="template-card">
                <p>Title: {template.title}</p>
                <p>Description: {template.description}</p>
              </div>
            ))
          ) : (
            <p>You have no templates.</p>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Forms:</h2>
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
            <p>You have no submitted forms.</p>

          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
