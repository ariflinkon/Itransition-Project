// src/client/components/FormBuilder/QuestionTypes/IntegerInput.js
import React from 'react';

const IntegerInput = ({ question, handleChange }) => {
  return (
    <div className="integer-input mb-4">
      <label className="block">{question.text}</label>
      <input
        type="number"
        className="input w-full"
        value={question.answer || ''}
        onChange={(e) => handleChange(question.id, parseInt(e.target.value, 10))}
      />
    </div>
  );
};

export default IntegerInput;
