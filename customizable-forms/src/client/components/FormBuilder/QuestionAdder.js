import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/formeditor.css';  

const QuestionAdder = ({ addQuestion }) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("SingleLineInput");

  const handleAddQuestion = () => {
    const newQuestion = { text: questionText, type: questionType };
    addQuestion(newQuestion);
    setQuestionText("");
    setQuestionType("SingleLineInput");
  };

  return (
    <div className="question-adder card shadow-sm mt-4 p-3">
      <h3 className="mb-3">Add New Question</h3>
      <div className="form-group mb-3 d-flex align-items-center">
        <div className="flex-grow-1 me-3">
          <label htmlFor="questionText" className="form-label">Question Text</label>
          <input
            type="text"
            id="questionText"
            className="form-control"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question"
          />
        </div>
        <div>
          <label htmlFor="questionType" className="form-label">Question Type</label>
          <select
            id="questionType"
            className="form-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="SingleLineInput">Single Line Input</option>
            <option value="MultiLineInput">Multi Line Input</option>
            <option value="IntegerInput">Integer Input</option>
            <option value="CheckboxInput">Checkbox Input</option>
          </select>
        </div>
      </div>
      <button className="btn btn-success" onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default QuestionAdder;