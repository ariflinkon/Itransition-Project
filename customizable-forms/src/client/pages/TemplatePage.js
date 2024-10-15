import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


const TemplatePage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    api.get(`/templates/${id}`)
      .then(response => {
        setTemplate(response.data);
      })
      .catch(error => {
        console.error("Error fetching template:", error);
      });

    api.get(`/forms?templateId=${id}`)
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error("Error fetching forms:", error);
      });
  }, [id]);

  return (
    <div className="template-page">
      {template ? (
        <>
          <h1>{template.title}</h1>
          <p>{template.description}</p>
          <div className="forms-section">
            <h2>Filled Forms</h2>
            {forms.length ? (
              forms.map(form => (
                <div key={form.id} className="form-entry">
                  <p>Form ID: {form.id}</p>
                  <p>Submitted by: {form.user}</p>
                  <p>Submission Date: {form.submittedAt}</p>
                </div>
              ))
            ) : (
              <p>No forms have been submitted for this template.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
};

export default TemplatePage;
