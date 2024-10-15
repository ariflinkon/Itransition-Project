import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const FormResultsPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/forms/${id}`)
      .then(response => {
        setForm(response.data);
      })
      .catch(error => {
        console.error("Error fetching form:", error);
      });
  }, [id]);

  return (
    <div className="form-results-page">
      {form ? (
        <>
          <h1>Form Results</h1>
          <p>Form ID: {form.id}</p>
          <p>Submitted by: {form.user}</p>
          <div className="form-answers">
            {form.answers.map((answer, index) => (
              <div key={index} className="answer-entry">
                <p>Question: {answer.question}</p>
                <p>Answer: {answer.value}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading form results...</p>
      )}
    </div>
  );
};

export default FormResultsPage;
