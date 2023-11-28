import React, { useState, useEffect } from 'react';
import { useUser } from '../../../pages/User/UserContext';
import { jwtDecode } from 'jwt-decode';
import Login from '../../../pages/Login/Login';
import Signup from '../../../pages/Signup/Signup';

const QuestionList = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const { currUser, setCurrUser } = useUser();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [show, setShow] = useState(true);

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/questions/${questionId}`);
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <p>Cargando...</p>;
  }

  const handleToggleLike = (e, questionId) => {
    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    // const likeAction  "subtract" : "add";

    fetch(
      `http://localhost:3001/api/v1/questions/${questionId}/toggle_like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          // action: likeAction,
          user: {
            id: currUser.user.id,
            name: currUser.user.name,
            email: currUser.user.email,
          },
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Token: ${response.statusText}`);
        }

        return response.json();
      })
      .then((updatedQuestion) => {
        setQuestion({
          ...question,
          question_points: updatedQuestion.question_points,
        });
      })
      .catch((error) => {
        console.error("Error al dar like a la pregunta:", error);
      });
  };

  return (
    <div className="question-container">
      <div className="question-card">
        <div className="question-header">
          <div className="user-info">{question.user.name}</div>
          <div className="question-type">{question.question_type}</div>
        </div>
        <h2 className="question-title">{question.title}</h2>
        <p className="question-body">{question.body}</p>
        <div className="question-actions">
          <button
            className="respond-button"
            onClick={(e) => handleToggleLike(e, question.id, )}
          >
           👍
          </button>
          <span className="like-count">
            Likes: {question.question_points}
          </span>
        </div>
      </div>

      {showLoginPopup && (
        <div className="modal-container">
          <button
            id="top-right-button"
            onClick={() => setShowLoginPopup(false)}
          >
            Cerrar
          </button>
          <br />
          <div>
            {show ? (
              <Login setCurrUser={setCurrUser} setShow={setShow} />
            ) : (
              <Signup setCurrUser={setCurrUser} setShow={setShow} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
