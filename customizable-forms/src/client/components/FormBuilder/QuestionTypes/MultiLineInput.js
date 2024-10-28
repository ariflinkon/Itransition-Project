
import React from 'react';

const MultiLineInput = ({ question, handleChange }) => {
  return (
    <div className="multi-line-input mb-4">
      <label className="block">{question.text}</label>
      <textarea
        className="textarea w-full"
        value={question.answer || ''}
        onChange={(e) => handleChange(question.id, e.target.value)}
      ></textarea>
    </div>
  );
};

export default MultiLineInput;
