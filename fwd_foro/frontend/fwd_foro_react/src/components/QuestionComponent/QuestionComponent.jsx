import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import "./QuestionComponent.css";
import { useUser } from "../../pages/User/UserContext";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import { jwtDecode } from "jwt-decode";

const QuestionComponent = () => {
  const { currUser, setCurrUser } = useUser();
  const [show, setShow] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/questions");
        const jsonData = await response.json();
        setQuestions(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleToggleLike = (e, questionId, userLiked) => {
    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    const likeAction = userLiked ? "subtract" : "add";

    fetch(
      `http://localhost:3001/api/v1/questions/${questionId}/toggle_like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          action: likeAction,
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
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  question_points: updatedQuestion.question_points,
                }
              : q
          )
        );
      })
      .catch((error) => {
        console.error("Error al dar like a la pregunta:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.sub;
      fetch(`http://localhost:3001/api/v1/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [setCurrUser]);

  return (
    <div className="question-container">
      {Array.isArray(questions) ? (
        questions.map((question) => (
          <div key={question.id} className="question-card">
            <div className="question-header">
              <div className="user-info">{question.user.name}</div>
              <div className="question-type">{question.question_type}</div>
            </div>
              <h2 className="question-title">{question.title}</h2>
            <div className="title-body">
              <p className="question-body">{question.body}</p>
            </div>
            <br />
            <div className="question-actions">
              <button
                className="respond-button"
                onClick={(e) => handleToggleLike(e, question.id)}
              >
                👍
              </button>
              <span className="like-count">
                Likes: {question.question_points}
              </span>
            </div>
            <div className="respond-button-container">
              <Link to={`/question/${question.id}`}>
                <button className="btn btn-primary">Responder</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No hay preguntas disponibles.</p>
      )}

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

export default QuestionComponent;
