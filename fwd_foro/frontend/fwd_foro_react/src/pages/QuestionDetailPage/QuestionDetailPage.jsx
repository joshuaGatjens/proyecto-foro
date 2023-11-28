// QuestionDetailPage.js
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import QuestionList from '../../components/QuestionDetailPage/QuestionList/QuestionList';
import Navbar1 from '../../components/Navbar/Navbar';
import AnswerList from '../../components/QuestionDetailPage/AnswerList/AnswerList';

function QuestionDetailPage() {
  const { id } = useParams();

  return (
    <div className="question-detail-container">
      <Navbar1></Navbar1>


      {/* Parte superior: Detalles de la Pregunta */}
      <div className="question-details">
        <h1>Detalles de la Pregunta</h1>
        <QuestionList questionId={id} />
      </div>

      {/* Parte inferior: Respuestas y Comentarios */}
      <div className="answers-and-comments">
        <div className="answers">
          <h2>Respuestas</h2>
            <AnswerList></AnswerList>
        </div>

        <div className="comments">
          <h2>Comentarios</h2>
          {/* <CommentComponent /> */}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetailPage;
