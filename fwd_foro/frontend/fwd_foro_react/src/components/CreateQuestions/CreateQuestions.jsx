// CreateQuestions.jsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../pages/User/UserContext";
import { jwtDecode } from "jwt-decode";
import "./CreateQuestions.css"; // Importa el archivo de estilos CSS

const CreateQuestions = () => {
  const { currUser, setCurrUser } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const storedToken = localStorage.getItem('token');
  const history = useHistory();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currUser) {
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/v1/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          question: {
            user_id: currUser.user.id,
            title: title,
            body: body
          }
        }),
      });

      if (response.ok) {
        const { id } = await response.json();
        history.push(`/question/${id}`);
      } else {
        console.error("Error al crear la pregunta:", response.statusText);
      }
    } catch (error) {
      console.error("Error al crear la pregunta:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.sub;

      fetch(`http://localhost:3001/api/v1/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setCurrUser(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [setCurrUser]);

  return (
    <div className="create-question-container">
      <h2 className="create-question-title">Crear Nueva Pregunta</h2>
      <form className="create-question-form" onSubmit={handleSubmit}>
        <label className="create-question-label">
          <span className="create-question-label-text">Título:</span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="create-question-input"
          />
        </label>
        <br />
        <label className="create-question-label">
          <span className="create-question-label-text">Cuerpo:</span>
          <textarea
            value={body}
            onChange={handleBodyChange}
            className="create-question-textarea"
          />
        </label>
        <br />
        <button type="submit" className="create-question-button">
          Crear Pregunta
        </button>
      </form>
    </div>
  );
};

export default CreateQuestions;
