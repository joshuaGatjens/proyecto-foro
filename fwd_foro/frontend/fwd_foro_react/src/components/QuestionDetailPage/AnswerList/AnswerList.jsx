import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnswerList.css'; // Archivo CSS para los estilos

const AnswerList = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/answers/${id}`);
        const data = await response.json();

        // Verifica si la respuesta es un array antes de intentar mapearlo
        if (Array.isArray(data)) {
          setAnswers(data);
        } else {
          // Si no es un array, puedes convertirlo en un array para manejarlo de manera uniforme
          setAnswers([data]);
        }
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [id]);

  if (answers.length === 0) {
    return <p className="no-answers">No hay respuestas aún.</p>;
  }

  return (
    <div className="answer-list">
      <h3 className="answer-heading"></h3>
      {answers.map((answer) => (
        <div key={answer.id} className="answer-card">
          <p className="answer-body">{answer.body}</p>
          {/* Puedes mostrar más detalles de la respuesta según tus necesidades */}
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
