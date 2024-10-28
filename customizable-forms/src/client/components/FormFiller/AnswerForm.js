import React, { useState } from "react";
import api from "../../services/api";

const AnswerForm = ({ questions, templateId }) => {
  const [answers, setAnswers] = useState([]);

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const formData = { templateId, answers };
    api.post("/forms", formData)
      .then(response => {
        console.log("Form submitted successfully", response.data);
      })
      .catch(error => {
        console.error("Error submitting form", error);
      });
  };

  return (
    <div className="answer-form">
      <h2>Fill out the form</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-item">
          <label>{question.text}</label>
          {question.type === "SingleLineInput" && (
            <input
              type="text"
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}
          {question.type === "MultiLineInput" && (
            <textarea
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}
          {question.type === "IntegerInput" && (
            <input
              type="number"
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}
          {question.type === "CheckboxInput" && (
            <input
              type="checkbox"
              onChange={(e) =>
                handleInputChange(index, e.target.checked ? "Yes" : "No")
              }
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AnswerForm;
