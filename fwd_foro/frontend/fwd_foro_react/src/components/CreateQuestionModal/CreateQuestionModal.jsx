// CreateQuestionModal.jsx
import React, { useState } from "react";
import CreateQuestions from "../CreateQuestions/CreateQuestions";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import { useUser } from "../../pages/User/UserContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./CreateQuestionModal.css";

const CreateQuestionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { currUser, setCurrUser } = useUser();
  const [show, setShow] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
          console.error("Error fetching user data:", error);
        });
    }
  }, [setCurrUser]);


  return (
    <div className="create-question-modal create-question-card">
      <h1>¿Quieres hacer una pregunta?</h1>
      <div>
        <button className="open-button btn btn-warning" onClick={openModal}>
          Crear una pregunta
        </button>
      </div>

      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            {/* Botón de cerrar en la esquina superior derecha */}
            <div className="modal-body">
          <button
            id="top-right-button"
            onClick={closeModal}
          >
            Cerrar
          </button>
              <h2>¿Quieres hacer una pregunta?</h2>
              {show ? (
                currUser ? (
                  <CreateQuestions />
                ) : (
                  <Login setCurrUser={setCurrUser} setShow={setShow} />
                )
              ) : (
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuestionModal;
