// src/client/pages/TemplatePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTemplateById } from '../services/api';
import FormEditor from '../components/FormBuilder/FormEditor';
import FormDisplay from '../components/FormFiller/FormDisplay';

const TemplatePage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getTemplateById(id).then(setTemplate);
  }, [id]);

  if (!template) {
    return <p>Loading...</p>;
  }

  const handleToggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="template-page p-5">
      <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
      <p>{template.description}</p>
      <button onClick={handleToggleEdit} className="btn-secondary mb-4">
        {isEditing ? 'View' : 'Edit'}
      </button>
      {isEditing ? (
        <FormEditor template={template} />
      ) : (
        <FormDisplay questions={template.questions} />
      )}
    </div>
  );
};

export default TemplatePage;
