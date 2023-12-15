import React, { useState, useEffect } from 'react';
import Login from '../../../pages/Login/Login';
import Signup from '../../../pages/Signup/Signup';
import { useUser } from '../../../pages/User/UserContext';
import { jwtDecode } from 'jwt-decode';
import './CreateAnswer.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import QuestionList from '../QuestionList/QuestionList';
import Iframe from 'react-iframe';
import YouTube from 'react-youtube';

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

const CreateAnswer = ({
  questionId,
  onAnswerSubmit,
  setRefreshAnswers,
  onClose,
  showLoginPopup,
  setShowLoginPopup,
  show,
  setShow,
}) => {
  const [answerBody, setAnswerBody] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [answerBodyError, setAnswerBodyError] = useState(null);
  const { currUser, setCurrUser } = useUser();
  const storedToken = localStorage.getItem('token');
  const { id } = useParams();
  const [iframeError, setIframeError] = useState(false);

  const validateAnswerBody = (value) => {
    if (value.length === 0) {
      setAnswerBodyError('La respuesta no puede estar vacía.');
    } else if (value.length > 400) {
      setAnswerBodyError('La respuesta no puede tener más de 400 caracteres.');
    } else {
      setAnswerBodyError(null);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    // Validar respuesta antes de enviar la solicitud
    validateAnswerBody(answerBody);

    if (answerBodyError) {
      console.log('Hay errores en el formulario. No se enviará la respuesta.');
      return;
    }

    if (!currUser || !currUser.user || !currUser.user.id) {
      setShowLoginPopup(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/questions/${questionId}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            user_id: currUser.user.id,
            body: answerBody,
            resource_url: resourceUrl,
            question_id: questionId,
          }),
        }
      );

      if (!response.ok) {
        console.error(response);
        throw new Error('Error al enviar la respuesta');
      }

      const newAnswer = await response.json();

      // Ejecuta la función proporcionada para manejar la nueva respuesta
      onAnswerSubmit(newAnswer);

      // Actualiza el estado refreshAnswers para notificar a AnswerList que se ha creado una nueva respuesta
      setRefreshAnswers((prev) => ({ refreshAnswers: !prev.refreshAnswers }));
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    } finally {
      // Actualiza el estado para refrescar las respuestas
      setRefreshAnswers(true);

      // Limpia los campos de respuesta y URL de recurso
      setAnswerBody('');
      setResourceUrl('');

      // Cierra el modal solo si no hay errores y onClose está definido
      if (!answerBodyError && onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.sub;
      fetch(`http://localhost:3001/api/v1/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrUser(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [setCurrUser]);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const renderPreview = () => {
    if (resourceUrl.includes('youtube.com')) {
      // Si la URL es de YouTube, utiliza el componente YouTube de react-youtube
      const videoId = new URL(resourceUrl).searchParams.get('v');
      return <YouTube videoId={videoId} />;
    } else {
      // En caso contrario, utiliza el componente Iframe para cualquier otro tipo de URL
      return (
        <Iframe
          url={resourceUrl}
          width="100%"
          height="400px"
          onError={handleIframeError}
        />
      );
    }
  };

  return (
    <div className={`answer-modal ${show ? 'show' : ''}`}>
      <div className="answer-modal-content">
        <div className="answer-modal-left">
          <QuestionList questionId={id} />
        </div>
        <div className="answer-modal-right">
          {showLoginPopup && (
            <div className="modal-container">
              <div>
                {show ? (
                  <Login setCurrUser={setCurrUser} setShow={setShow} />
                ) : (
                  <Signup setCurrUser={setCurrUser} setShow={setShow} />
                )}
              </div>
            </div>
          )}
          <form onSubmit={handleAnswerSubmit}>
            <textarea
              placeholder="Escribe tu respuesta..."
              value={answerBody}
              onChange={(e) => {
                setAnswerBody(e.target.value);
                validateAnswerBody(e.target.value);
              }}
              className={answerBodyError ? 'error' : ''}
            ></textarea>
            {answerBodyError && <div className="error-message">{answerBodyError}</div>}
            <div className='add-resource'>
              ...añade un recurso (URL)...
              <input
                type="text"
                placeholder=''
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Responder
            </button>
            {resourceUrl && isValidUrl(resourceUrl) && (
              <div>
                <h3>Vista previa:</h3>
                {iframeError ? (
                  <p>Error loading content</p>
                ) : (
                  renderPreview()
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAnswer;
