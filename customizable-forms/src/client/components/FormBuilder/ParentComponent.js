import React, { useState } from "react";
import QuestionAdder from "./QuestionAdder";
import FormEditor from './FormEditor';

const ParentComponent = () => {
  const templateId = '1'; 
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div>
      <QuestionAdder addQuestion={addQuestion} />
      {/* Render the list of questions */}
      <ul>
        <FormEditor templateId={templateId} />
        {questions.map((question, index) => (
          <li key={index}>{question.text} ({question.type})</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;