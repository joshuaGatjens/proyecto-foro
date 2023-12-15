import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../pages/User/UserContext";
import { jwtDecode } from "jwt-decode";
import "./CreateQuestions.css";

const CreateQuestions = () => {
  const { currUser, setCurrUser } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [allLabels, setAllLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [bodyError, setBodyError] = useState(null);

  const storedToken = localStorage.getItem("token");
  const history = useHistory();

  const validateTitle = (value) => {
    if (value.length === 0) {
      setTitleError("El título no puede estar vacío.");
    } else if (value.length > 100) {
      setTitleError("El título no puede tener más de 100 caracteres.");
    } else {
      setTitleError(null);
    }
  };

  const validateBody = (value) => {
    if (value.length === 0) {
      setBodyError("El cuerpo no puede estar vacío.");
    } else if (value.length > 400) {
      setBodyError("El cuerpo no puede tener más de 400 caracteres.");
    } else {
      setBodyError(null);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    validateTitle(value);
  };

  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBody(value);
    validateBody(value);
  };

  const handleLabelChange = (e) => setSelectedLabel(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currUser) {
      console.log(
        "Usuario no autenticado. Redirigiendo a la página de inicio de sesión."
      );
      return;
    }

    // Validar título y cuerpo antes de enviar la solicitud
    validateTitle(title);
    validateBody(body);

    if (titleError || bodyError) {
      console.log("Hay errores en el formulario. No se enviará la solicitud.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/v1/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          question: {
            user_id: currUser.user.id,
            title: title,
            body: body,
            label_ids: [selectedLabel], // Cambia a un array si permites seleccionar múltiples etiquetas
          },
        }),
      });

      if (response.ok) {
        const { id } = await response.json();
        history.push(`/question/${id}`);
      } else {
        console.error(
          "Error al crear la pregunta:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al crear la pregunta:", error.message);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/labels`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Etiquetas obtenidas:", data);
        setAllLabels(data);
      })
      .catch((error) => {
        console.error("Error al obtener las etiquetas:", error);
      });

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
    <div className="create-question-container">
      <h2 className="create-question-title">Crear Nueva Pregunta</h2>
      <form className="create-question-form" onSubmit={handleSubmit}>
        <label className="create-question-label">
          <span className="create-question-label-text">Título:</span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={`create-question-input ${titleError ? "error" : ""}`}
          />
          {titleError && <div className="error-message">{titleError}</div>}
        </label>
        <br />
        <label className="create-question-label">
          <span className="create-question-label-text">Cuerpo:</span>
          <textarea
            value={body}
            onChange={handleBodyChange}
            className={`create-question-textarea ${bodyError ? "error" : ""}`}
          />
          {bodyError && <div className="error-message">{bodyError}</div>}
        </label>
        <br />
        <label className="create-question-label">
          <span className="create-question-label-text">Etiquetas:</span>
          <select
            value={selectedLabel}
            onChange={handleLabelChange}
            className="create-question-select"
          >
            <option value="" disabled>
              Selecciona una etiqueta
            </option>
            {allLabels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>
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
