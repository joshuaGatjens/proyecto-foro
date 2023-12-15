import React from "react";
import './SideBar.css';

const SideBar = ({ onDataTypeChange }) => {
  const handleMoreLikes = (newType) => {
    onDataTypeChange(newType);
  };

  const handleMore = (newType) => {
    onDataTypeChange(newType, newType);
  };

  return (
    <div className="sidebar">
      <h3>Ranking</h3>
      <ul>
        <li>
          <button
            className="styled-button likes-button"
            onClick={() => handleMoreLikes('questions')}
          >
            Preguntas con más likes
          </button>
        </li>
        <li>
          <button
            className="styled-button likes-button"
            onClick={() => handleMoreLikes('answers')}
          >
            Respuestas con más likes
          </button>
        </li>
        <li>
          <button
            className="styled-button more-button"
            onClick={() => handleMore('questions')}
          >
            Más preguntones
          </button>
        </li>
        <li>
          <button
            className="styled-button more-button"
            onClick={() => handleMore('answers')}
          >
            Sabelotodos
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
