import React, { useState } from "react";
import { useUser } from "../../../pages/User/UserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./CreateComment.css";

const CreateComment = ({ answerID, onCommentSubmit }) => {
  const [body, setBody] = useState("");
  const { currUser } = useUser();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      console.error("El cuerpo del comentario no puede estar vacío");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/questions/${id}/answers/${answerID}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body,
            user_id: currUser.user.id,
            commentable_type: "Answer",
            commentable_id: answerID,
          }),
        }
      );

      if (!response.ok) {
        console.error(response);
        throw new Error("Error al enviar el comentario");
      }

      const newComment = await response.json();

      // Limpia el formulario después de enviar
      setBody("");

      // Ejecuta la función proporcionada para manejar el nuevo comentario
      onCommentSubmit(newComment, answerID);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  return (
    <div className="create-comment">
      <form className="form-container" onSubmit={handleSubmit}>
        <h4 className="form-title">Añadir Comentario</h4>
        <div className="input-group">
          <input
            required
            type="text"
            className="input-field"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="label-text">Comentario</label>
        </div>
        <button type="submit" className="submit-button">
          Enviar Comentario
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
