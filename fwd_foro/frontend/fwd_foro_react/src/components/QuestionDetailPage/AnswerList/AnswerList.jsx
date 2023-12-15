import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AnswerList.css";
import CommentsList from "../CommentList/CommentList";
import CreateComment from "../CreateComment/CreateComment";
import { useUser } from "../../../pages/User/UserContext";
import { jwtDecode } from "jwt-decode";
import UserAvatars from "../../UserAvatars/UserAvatars";
import YouTube from "react-youtube";

const AnswerList = ({ refreshAnswers, searchQuery }) => {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [showComments, setShowComments] = useState({});
  const { currUser, setCurrUser } = useUser();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const storedToken = localStorage.getItem("token");
  const [useYouTube, setUseYouTube] = useState(true);
  const [refreshCommentsSignal, setRefreshCommentsSignal] = useState(0);

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
  }, [setCurrUser, refreshAnswers]);

  useEffect(() => {
    const handleResize = () => {
      setUseYouTube(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/questions/${id}/answers`
        );
        const data = await response.json();
        const initialShowComments = {};
        data.forEach((answer) => {
          initialShowComments[answer.id] = false;
        });
        setAnswers(data);
        setShowComments(initialShowComments);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, [id, refreshAnswers, refreshCommentsSignal]);

  const toggleComments = (answerId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [answerId]: !prevShowComments[answerId],
    }));
  };

  const toggleLikeAnswer = (e, answerId) => {
    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    fetch(
      `http://localhost:3001/api/v1/questions/${id}/answers/${answerId}/toggle_like`,
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
      .then((updatedAnswer) => {
        setAnswers((prevAnswers) =>
          prevAnswers.map((a) =>
            a.id === answerId
              ? { ...a, answer_points: updatedAnswer.answer_points }
              : a
          )
        );
      })
      .catch((error) => {
        console.error("Error al dar like a la respuesta:", error);
      });
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/questions/${id}/answers/${answerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Token: ${response.statusText}`);
      }

      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== answerId)
      );

      console.log(`Respuesta con ID ${answerId} eliminada exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar la respuesta:", error);
    }
  };

  const handleCommentSubmit = (newComment, answerId) => {
    setRefreshCommentsSignal((prevSignal) => prevSignal + 1);
  };

  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match && match[1];
  };

  const filteredQuestions = answers.filter(
    (question) =>
      question.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="answer-list">
      {answers.length === 0 && (
        <p style={{ color: "black" }}>Nadie ha respondido aún.</p>
      )}
      {filteredQuestions
        .filter((answer) => answer.question_id === parseInt(id))
        .map((answer) => (
          <div key={answer.id} className="answer-card">
            <div className="user-and-photo">
              <span>
                <UserAvatars userId={answer.user.id}></UserAvatars>
              </span>
              <span className="name">{answer.user.name}</span>
            </div>
            <div className="answers_body">
              <p className="answer-body">{answer.body}</p>
              {answer.resource_url && (
                <div className="resource-card">
                  <div className="resource-text">Recurso</div>
                  {answer.resource_url.includes("youtube.com") ? (
                    useYouTube ? (
                      <YouTube videoId={getYouTubeVideoId(answer.resource_url)} />
                    ) : (
                      <div className="resource-url-container">
                        <a
                          className="resource-url"
                          href={answer.resource_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {answer.resource_url}
                        </a>
                      </div>
                    )
                  ) : (
                    <div className="resource-url-container">
                      <a
                        className="resource-url"
                        href={answer.resource_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {answer.resource_url}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="answer-actions">
              <div className="likes-funcions">
                <button className="Btn"
                  onClick={(e) => toggleLikeAnswer(e, answer.id)}
                >
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
                  <span className="like-count"><h5>{answer.answer_points}</h5></span>
                </button>
              </div>
              {console.log("aka", answer.user_id, currUser.user.id)}
              {answer.user.id === currUser.user.id && (
                <div className="delete-answer-container">
                  <button 
                    onClick={() => handleDeleteAnswer(answer.id)} 
                    className="noselect"><span className="text">Delete</span>
                    <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                      </span>
                      </button>
                </div>
              )}
            </div>
            <div>
              <div className="comments-section">
                <CreateComment
                  answerID={answer.id}
                  onCommentSubmit={handleCommentSubmit}
                />
                <CommentsList
                  comments={answer.comments || []}
                  answerId={answer.id}
                  refreshCommentsSignal={refreshCommentsSignal}
                />
              </div>
            </div>
          </div>
        ))}
      {showLoginPopup && (
        <div className="modal-container">
          <button
            id="top-right-button"
            onClick={() => setShowLoginPopup(false)}
          >
            Cerrar
          </button>
          <br />
          <p>Debes iniciar sesión para dar like a respuestas.</p>
        </div>
      )}
    </div>
  );
};

export default AnswerList;
