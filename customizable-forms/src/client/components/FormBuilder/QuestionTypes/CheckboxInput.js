// src/client/components/FormBuilder/QuestionTypes/CheckboxInput.js
import React from 'react';

const CheckboxInput = ({ question, handleChange }) => {
  return (
    <div className="checkbox-input mb-4">
      <label className="block">{question.text}</label>
      <input
        type="checkbox"
        className="checkbox"
        checked={question.answer || false}
        onChange={(e) => handleChange(question.id, e.target.checked)}
      />
    </div>
  );
};

export default CheckboxInput;
