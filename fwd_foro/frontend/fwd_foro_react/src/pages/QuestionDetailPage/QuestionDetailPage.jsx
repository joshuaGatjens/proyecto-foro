// QuestionDetailPage.js
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import QuestionList from '../../components/QuestionDetailPage/QuestionList/QuestionList';
import AnswerList from '../../components/QuestionDetailPage/AnswerList/AnswerList';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import CreateAnswer from '../../components/QuestionDetailPage/CreateAnswer/CreateAnswer';
import { useState } from 'react';
import { useUser } from '../User/UserContext';
import './QuestionDetailPage.css';
function QuestionDetailPage() {
  const { id } = useParams();
  const { currUser, setCurrUser } = useUser();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [refreshAnswers, setRefreshAnswers] = useState(false);
  const handleOpenAnswerModal = () => {
    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    setShowAnswerModal(true);
  };

  const handleCloseAnswerModal = () => {
    setShowAnswerModal(false);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar
        onSearchChange={handleSearch}
        searchQuery={searchQuery}></Navbar>
      <div className="question-detail-container">

        {/* Parte superior: Detalles de la Pregunta */}
        <div className="question-details">
          <h1>Detalles de la Pregunta</h1>
          <QuestionList questionId={id} />

          {/* Botón para añadir respuesta después de la QuestionList */}
          <div className="add-answer-button-bottom">
            <button onClick={handleOpenAnswerModal} class="btn-shape">
              <span class="title">
                Añadir Respuesta
              </span>
            </button>
          </div>
        </div>

        {/* Parte inferior: Respuestas y Comentarios */}
        <h2>Respuestas</h2>
        <AnswerList searchQuery={searchQuery}
          refreshAnswers={refreshAnswers}></AnswerList>




        {/* Modal para agregar respuesta */}
        {showAnswerModal && (
          <div className="modal-container">
            <div id="button-close" onClick={handleCloseAnswerModal}>
              <button class="btn1"><i class="animation"></i>CERRAR<i class="animation"></i>
              </button>
            </div>
            <br />
            <CreateAnswer
              setRefreshAnswers={setRefreshAnswers}
              questionId={id}
              onClose={handleCloseAnswerModal}
              show={showAnswerModal}
              onAnswerSubmit={handleCloseAnswerModal} />
          </div>
        )}

      </div>
      <Footer></Footer>
    </div>
  );
}

export default QuestionDetailPage;
