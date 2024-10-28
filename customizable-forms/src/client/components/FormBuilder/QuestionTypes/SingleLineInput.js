// src/client/components/FormBuilder/QuestionTypes/SingleLineInput.js
import React from 'react';

const SingleLineInput = ({ question, handleChange }) => {
  return (
    <div className="single-line-input mb-4">
      <label className="block">{question.text}</label>
      <input
        type="text"
        className="input w-full"
        value={question.answer || ''}
        onChange={(e) => handleChange(question.id, e.target.value)}
      />
    </div>
  );
};

export default SingleLineInput;
