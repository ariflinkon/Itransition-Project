import React, { useState, useEffect } from "react";
import QuestionAdder from "./QuestionAdder";
import api from "../../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/formeditor.css'; 

const FormEditor = ({ templateId }) => {
  console.log("Template ID:", templateId); // Add this line for debugging
  const [title, setTitle] = useState("Untitled form");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user ID from the server
    api.get('/api') // Assuming this endpoint returns the current user's details
      .then(response => {
        setUserId(response.data.id);
      })
      .catch(error => {
        console.error("Error fetching user ID", error);
      });
  }, []);

  const handleSaveTemplate = () => {
    const newTemplate = { title, description, questions }; 
    
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    api.post(`/api/templates`, { ...newTemplate, userId })
      .then(response => {
        console.log("Template saved", response.data);
      })
      .catch(error => {
        console.error("Error saving template", error);
      });
  };

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const duplicateQuestion = (index) => {
    const questionToDuplicate = questions[index];
    setQuestions([...questions, { ...questionToDuplicate }]);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="form-editor container mt-4">
      <div className="form-header p-3 mb-4 shadow-sm">
        <input 
          className="form-control mb-2"
          placeholder="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          className="form-control mb-2"
          placeholder="Form description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="questions-section">
        <h2>Questions</h2>
        {questions.length ? (
          questions.map((q, index) => (
            <div key={index} className="question-card card shadow-sm mb-3 p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="question-text mb-1">Question: {q.text}</p>
                  <small>Type: {q.type}</small>
                </div>
                <div className="question-options">
                  <i className="fa fa-copy me-3" title="Duplicate" onClick={() => duplicateQuestion(index)}></i>
                  <i className="fa fa-trash" title="Delete" onClick={() => deleteQuestion(index)}></i>
                </div>
              </div>
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" id={`required-${index}`} />
                <label className="form-check-label" htmlFor={`required-${index}`}>
                  Required
                </label>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No questions added yet.</p>
        )}
        <QuestionAdder addQuestion={addQuestion} />
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSaveTemplate}>Save Template</button>
    </div>
  );
};

export default FormEditor;