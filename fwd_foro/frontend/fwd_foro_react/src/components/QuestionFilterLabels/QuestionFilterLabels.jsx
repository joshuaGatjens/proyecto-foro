// QuestionFilterLabels.js

import React, { useEffect, useState } from "react";
import "./QuestionFilterLabels.css";
import UserAvatars from "../UserAvatars/UserAvatars";
import { useUser } from "../../pages/User/UserContext";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";

const QuestionFilterLabels = ({ labelId, searchQuery }) => {
  const { currUser, setCurrUser } = useUser();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [show, setShow] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const storedToken = localStorage.getItem("token");
  const questionsPerPage = 15;

  useEffect(() => {
    const fetchFilteredQuestions = async () => {
      try {
        let url = `http://localhost:3001/api/v1/labels/${labelId}/questions`;

        if (searchQuery) {
          url += `?search=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        const jsonData = await response.json();
        setFilteredQuestions(jsonData);
      } catch (error) {
        console.error("Error fetching filtered questions:", error);
      }
    };

    fetchFilteredQuestions();
  }, [labelId, searchQuery]);

  const handleToggleLike = (e, questionId) => {
    e.preventDefault();

    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    fetch(
      `http://localhost:3001/api/v1/questions/${questionId}/toggle_like`,
      {
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
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Token: ${response.statusText}`);
        }

        return response.json();
      })
      .then((updatedQuestion) => {
        setFilteredQuestions((prevQuestions) =>
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


  const handleDeleteQuestion = (e, questionId) => {
    e.preventDefault();

    if (!currUser || !currUser.user || !currUser.user.id) {
      // Si el usuario no está autenticado, puedes manejarlo de alguna manera
      console.error("Usuario no autenticado");
      return;
    }

    // Envía una solicitud para eliminar la pregunta
    fetch(`http://localhost:3001/api/v1/questions/${questionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Token: ${response.statusText}`);
        }
        // Actualiza la lista de preguntas después de eliminar
        setFilteredQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== questionId)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la pregunta:", error);
      });
  };


  const filteredQuestionsForNavbar = filteredQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPageCount = Math.ceil(filteredQuestionsForNavbar.length / questionsPerPage);
  const displayedQuestions = filteredQuestionsForNavbar.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );
  console.log(displayedQuestions);
  return (
    <div className="question-container">
      {Array.isArray(displayedQuestions) && displayedQuestions.length > 0 ? (
        displayedQuestions.map((question) => (
          <div key={question.id} className="question-card">
            <div className="question-header">
              <div className="avatar-container">
                <UserAvatars userId={question.user.id} />
              </div>
              <div className="user-info">
                <span className="user-name">{question.user.name}</span>
              </div>
              <div className="label-container">
                {question.labels && question.labels.length > 0 ? (
                  question.labels.map((label) => (
                    <span key={label.id} className="label">
                      {label.name}
                    </span>
                  ))
                ) : (
                  <span className="label">No hay etiquetas</span>
                )}
              </div>
            </div>
            <h2 className="question-title">{question.title}</h2>
            <div className="title-body">
              <p className="question-body">{question.body}</p>
            </div>
            <br />

            <div className="question-actions">
              {currUser &&
                currUser.user &&
                currUser.user.id === question.user.id && (
                  <div className="delete-button"
                  >
                    <button onClick={(e) => handleDeleteQuestion(e, question.id)}

                      class="noselect"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                  </div>
                )}
              <button
                className="Btn"
                onClick={(e) =>
                  handleToggleLike(e, question.id, question.user_liked)
                }
              >
                <span className="leftContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    fill="#fff"
                  >
                    {/* ... (icono de like) */}
                  </svg>
                  <span className="like">Like</span>
                </span>
                <span className="like-count">
                  <h5>{question.question_points}</h5>
                </span>
              </button>

              {/* Renderiza el botón de eliminar si el userId es igual al currUser.id */}

            </div>
            <div className="respond-button-container">
              <Link to={`/question/${question.id}`}>
                <button className="btn btn-primary">Responder</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>Nadie ha postado nada sobre este tema aún.</div>
      )}
      {totalPageCount > 1 && (
        <div className="pagination-container">
          <button
            className="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            className="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPageCount}
          >
            Siguiente
          </button>
        </div>
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

export default QuestionFilterLabels;
