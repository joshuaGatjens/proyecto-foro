// CreateAnswer.jsx
import React, { useState } from 'react';

const CreateAnswer = ({ questionId, addAnswer }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agrega cualquier otro encabezado necesario, como tokens de autenticación
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la respuesta');
      }

      const newAnswer = await response.json();
      // Llama a la función proporcionada para agregar la nueva respuesta al estado
      addAnswer(newAnswer);
      // Limpia el contenido del formulario
      setContent('');
    } catch (error) {
      console.error(error.message);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu respuesta..."
      />
      <button type="submit">Enviar respuesta</button>
    </form>
  );
};

export default CreateAnswer;
