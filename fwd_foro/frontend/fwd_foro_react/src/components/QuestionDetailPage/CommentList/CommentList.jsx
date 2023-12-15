import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './CommentList.css';
import { useUser } from '../../../pages/User/UserContext';

const CommentsList = ({ answerId, refreshCommentsSignal }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleComments, setVisibleComments] = useState(0);
  const { id } = useParams();
  const { currUser, setCurrUser } = useUser();
  const storedToken = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/v1/questions/${id}/answers/${answerId}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [answerId, id, refreshCommentsSignal]);

  useEffect(() => {
    if (refreshCommentsSignal) {
      fetchComments();
    }
  }, [refreshCommentsSignal]);

  const handleShowMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
  };

  const handleShowLess = () => {
    setVisibleComments((prevVisibleComments) => Math.max(prevVisibleComments - 5, 0));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/questions/${id}/answers/${answerId}/comments/${commentId}`,
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

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      console.log(`Comentario con ID ${commentId} eliminado exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const filteredComments = comments
    .filter((comment) => comment.commentable_id === answerId);

  if (loading) {
    return <p className="loading">Cargando comentarios...</p>;
  }

  if (filteredComments.length === 0) {
    return <p className="no-comments">No hay comentarios aún.</p>;
  }

  return (
    <div className="comments-list">
      {filteredComments
        .slice(0, visibleComments)
        .map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-user">
              {comment.user && (
                <p className="comment-username">{comment.user.name}</p>
              )}
              {comment.user_id === currUser.user.id && (
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Eliminar comentario
                </button>
              )}
            </div>
            <div className="comment-content">
              <p className="comment-body">{comment.body}</p>
            </div>
          </div>
        ))}
      {visibleComments < filteredComments.length && (
        <button className="show-more-button" onClick={handleShowMore}>
          Mostrar más comentarios
        </button>
      )}
      <br />
      <br />
      {visibleComments > 0 && (
        <button className="show-less-button" onClick={handleShowLess}>
          Mostrar menos comentarios
        </button>
      )}
    </div>
  );
};

export default CommentsList;
