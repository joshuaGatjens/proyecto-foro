import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./QuestionComponent.css";
import { useUser } from "../../pages/User/UserContext";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import { jwtDecode } from "jwt-decode";
import UserAvatars from "../UserAvatars/UserAvatars";

const QuestionComponent = ({ searchQuery }) => {
  const { currUser, setCurrUser } = useUser();
  const [show, setShow] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [pagedQuestions, setPagedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const storedToken = localStorage.getItem("token");
  const questionsPerPage = 15;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/questions?page=${currentPage}`
        );
        const jsonData = await response.json();
        setAllQuestions(jsonData.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, [storedToken, currentPage]);

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

  const handleToggleLike = (e, questionId, userLiked) => {
    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    const likeAction = userLiked ? "subtract" : "add";

    fetch(`http://localhost:3001/api/v1/questions/${questionId}/toggle_like`, {
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Token: ${response.statusText}`);
        }

        return response.json();
      })
      .then((updatedQuestion) => {
        setAllQuestions((prevQuestions) =>
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

  const handleDeleteQuestion = (questionId) => {
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
        setAllQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== questionId)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la pregunta:", error);
      });
  };

  const filteredQuestions = allQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPageCount = Math.ceil(filteredQuestions.length / questionsPerPage);
  const displayedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );
  console.log(allQuestions, "allquestions");

  return (
    <div className="question-container">
      {Array.isArray(displayedQuestions) ? (
        displayedQuestions.map((question, index) => (
          <div>
            <div
              key={question.id}
              className={`question-card ${index % 2 === 0 ? "even" : "odd"}`}
            >
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
                      <button onClick={() => handleDeleteQuestion(question.id)}
                        class="noselect"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                    </div>
                  )}
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
              <div className="respond-button-container">
                <Link to={`/question/${question.id}`}>
                  <button class="btn-round">Responder</button>
                </Link>
              </div>
              <div
                className={`side-image ${index % 2 === 0 ? "left-image" : "right-image"
                  }`}
              >
                <img
                  src={`img/${index % 2 === 0 ? "Flechas-04.png" : "Flechas-05.png"
                    }`}
                  alt={`Imagen_${index}`}
                  className="small-image"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay preguntas disponibles.</p>
      )}

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
