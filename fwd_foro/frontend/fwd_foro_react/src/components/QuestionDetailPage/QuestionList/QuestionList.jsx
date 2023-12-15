import React, { useState, useEffect } from "react";
import { useUser } from "../../../pages/User/UserContext";
import Login from "../../../pages/Login/Login";
import Signup from "../../../pages/Signup/Signup";
import UserAvatars from "../../UserAvatars/UserAvatars";
import "./QuestionList.css"; // Asegúrate de importar el archivo CSS
import CreateAnswer from "../CreateAnswer/CreateAnswer";

const QuestionList = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const { currUser, setCurrUser } = useUser();
  const [show, setShow] = useState(true);

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/questions/${questionId}`
        );
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <p>Cargando...</p>;
  }

  const handleToggleLike = (e, questionId) => {
    if (!currUser || !currUser.user || !currUser.user.id) {

      return;
    }

    fetch(`http://localhost:3001/api/v1/questions/${questionId}/toggle_like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        user: {
          id: currUser.user.id,
          name: currUser.user.name,
          email: currUser.user.email,
        },
      }),
    })
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
          <div className="avatar-info-container">
            <div className="avatar-container">
              <UserAvatars userId={question.user.id} />
            </div>
            <div className="user-info">
              <span className="user-name">{question.user.name}</span>
            </div>
          </div>
          <div className="question-type">{question.question_type}</div>
          <div className="tag">
            {question.labels && question.labels.length > 0 ? (
              question.labels.map((label) => (
                <span key={label.id} className="label">
                  {label.name}
                </span>
              ))
            ) : (
              <span className="label">Sin etiquetas</span>
            )}
          </div>
        </div>
        <h2 className="question-title">{question.title}</h2>
        <p className="question-body">{question.body}</p>
        <div className="question-actions">
        <button
                  className="Btn"
                  onClick={(e) =>
                    handleToggleLike(e, question.id, question.user_liked)}>
                  <span className="leftContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      fill="#fff"
                    >
                      <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path>
                    </svg>
                    <span className="like">Like</span>
                  </span>
                  <span className="like-count"><h5>{question.question_points}</h5></span>
                </button>
        </div>

      </div>




    </div>
  );
};

export default QuestionList;
