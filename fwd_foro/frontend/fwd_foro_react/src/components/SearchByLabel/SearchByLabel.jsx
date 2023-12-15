import React, { useState, useEffect } from "react";
import { useUser } from "../../pages/User/UserContext";
import "./SearchByLabel.css";

const SearchByLabel = () => {
  const { currUser } = useUser();
  const [allLabels, setAllLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleLabelChange = (e) => setSelectedLabel(e.target.value);

  useEffect(() => {
    // Lógica para obtener todas las etiquetas disponibles desde tu API de Rails
    fetch(`http://localhost:3001/api/v1/labels`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Etiquetas obtenidas:", data); // Agrega esta línea para depurar
        setAllLabels(data);
      })
      .catch((error) => {
        console.error("Error al obtener las etiquetas:", error);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/questions?label=${selectedLabel}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Agrega aquí cualquier encabezado de autenticación necesario
          },
        }
      );

      if (response.ok) {
        const questionsData = await response.json();
        setQuestions(questionsData);
      } else {
        console.error("Error al buscar preguntas por etiqueta:", response.statusText);
      }
    } catch (error) {
      console.error("Error al buscar preguntas por etiqueta:", error.message);
    }
  };

  return (
    <div className="search-by-label-container">
      <h2 className="search-by-label-title">Buscar Preguntas por Etiqueta</h2>
      <form className="search-by-label-form" onSubmit={handleSearch}>
        <label className="search-by-label-label">
          <span className="search-by-label-label-text">Selecciona una etiqueta:</span>
          <select
            value={selectedLabel}
            onChange={handleLabelChange}
            className="search-by-label-select"
          >
            <option value="" disabled>Selecciona una etiqueta</option>
            {allLabels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" className="search-by-label-button">
          Buscar Preguntas
        </button>
      </form>

      <div className="search-results">
        <h3>Resultados de la búsqueda:</h3>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <p>{question.title}</p>
              <p>{question.body}</p>
              {/* Agrega aquí cualquier otra información relevante de la pregunta */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchByLabel;
