// UserAvatars.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserAvatars.css'
const UserAvatars = ({ userId }) => {
  const [userAvatars, setUserAvatars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener la lista de avatares del usuario actual
    axios.get(`http://localhost:3001/api/v1/users/${userId}/avatar`)
      .then(response => {
        setUserAvatars(response.data.avatars);
        setLoading(false); // Cambiar el estado de carga a falso cuando se completa la solicitud
      })
      .catch(error => {
        console.error('Error al obtener avatares del usuario:', error);
        setLoading(false); // Cambiar el estado de carga a falso en caso de error
      });
  }, [userId]);

  return (
    <div className="avatar-container">
      {loading ? (
        // <p>Cargando avatares...</p>
        <div className="loader"></div>
      ) : (
        userAvatars.length > 0 ? (
          userAvatars.map(avatar => (
            <Link to={`/profile/${userId}`} key={avatar.user_id}>
              <img
                src={avatar.avatar ? avatar.avatar : "/img/avatar.png"}
                alt={`Avatar del usuario ${avatar.user_id}`}
                style={{
                  width: '50px',
                  height: '50px',
                  marginRight: '10px',
                  borderRadius: '50%', // Aplicar borde redondeado para que se vea circular
                }}
              />
            </Link>
          ))
        ) : (
          <Link to={`/profile/${userId}`}>
            <img
              src="/img/avatar.png"  // Ruta de la imagen cuando no hay avatares
              alt="No hay avatares"
              style={{
                width: '50px',
                height: '50px',
                marginRight: '10px',
                borderRadius: '50%', // Aplicar borde redondeado para que se vea circular
              }}
            />
          </Link>
        )
      )}
    </div>
  );
};

export default UserAvatars;
