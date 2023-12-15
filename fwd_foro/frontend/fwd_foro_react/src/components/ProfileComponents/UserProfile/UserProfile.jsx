import React, { useEffect, useState } from 'react';
import { useUser } from '../../../pages/User/UserContext';
import { jwtDecode } from 'jwt-decode';
import FetchQuestions from '../FetchQuestions/FetchQuestions';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ searchQuery }) => {
  const { currUser, setCurrUser } = useUser();
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    user: {
      avatar: null,
      description: 'Usuario no logeado',
      email: '',
      id: null,
      name: 'Anonimo',
    },
    questions: [],
  });

  const [newAvatar, setNewAvatar] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const targetUserId = userId || (token ? jwtDecode(token).sub : null);

    if (targetUserId) {
      fetch(`http://localhost:3001/api/v1/users/${targetUserId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [userId]);

  const { user } = userData;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  useEffect(() => {
    if (newAvatar) {
      handleUpdateAvatar();
    }
  }, [newAvatar]);

  const handleUpdateAvatar = () => {
    if (newAvatar) {
      const formData = new FormData();
      formData.append('user[avatar]', newAvatar);

      fetch(`http://localhost:3001/api/v1/users/${user.id}/update_avatar`, {
        method: 'PATCH',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user: {
              ...prevUserData.user,
              avatar: data.avatar_url,
            },
          }));
          setNewAvatar(null);
          document.getElementById('avatarInput').value = null;
        })
        .catch((error) => {
          console.error('Error updating avatar:', error);
        });
    }
  };

  const handleEditName = () => {
    setEditingName(true);
    setNewName(user.name);
  };

  const handleCancelEditName = () => {
    setEditingName(false);
    setNewName('');
    setNameError(null); // Limpiar el mensaje de error al cancelar
  };

  const handleSaveName = () => {
    if (newName.length > 30) {
      setNameError("El nombre no puede ser más largo de 30 caracteres.");
      return;
    }

    fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user: { name: newName } }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUserData((prevUserData) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            name: updatedUser.name,
          },
        }));
        setEditingName(false);
        setNameError(null); // Limpiar el mensaje de error en caso de éxito
      })
      .catch((error) => {
        console.error('Error updating name:', error);
      });
  };

  const handleEditDescription = () => {
    setEditingDescription(true);
    setNewDescription(user.description);
  };

  const handleCancelEditDescription = () => {
    setEditingDescription(false);
    setNewDescription('');
    setDescriptionError(null);
  };

  const handleSaveDescription = () => {
    if (newDescription.length > 100) {
      setDescriptionError("La descripción no puede ser más larga de 100 caracteres.");
      return;
    }

    fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user: { description: newDescription } }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUserData((prevUserData) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            description: updatedUser.description,
          },
        }));
        setEditingDescription(false);
        setDescriptionError(null);
      })
      .catch((error) => {
        console.error('Error updating description:', error);
      });
  };

  const avatarUrl = user.avatar || '/img/avatar.png';

  return (
    <div className="user-profile">
      <div className="userData" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div id='color'>
          <div className="profile-header">
            <div class="card">
              <div class="imgbox">
                <div class="img">
                  <img
                    src={avatarUrl}
                    alt="Foto de perfil"
                    style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '100%' }}
                  />
                </div>
              </div>
              <div class="details">
                <h2 class="title"></h2>
                <span class="caption">
                  {currUser && currUser.user && user.id === currUser.user.id && (
                    <>
                      <div className="custom-file-upload">
                        <span>Cambiar foto</span>
                        <label className='subir-imagen' htmlFor="avatarInput">Subir nueva imagen</label>
                        <input type="file" accept="image/*" id="avatarInput" onChange={handleFileChange} />
                      </div>

                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="userName">
            {editingName ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                <button onClick={handleSaveName}>Guardar</button>
                <button onClick={handleCancelEditName}>Cancelar</button>
              </>
            ) : (
              <>
                <h1>{user.name}</h1>
                {currUser && currUser.user && user.id === currUser.user.id && (
                  <button onClick={handleEditName}>Editar Nombre</button>
                )}
              </>
            )}
          </div>
          <div className="bio-details">
            <div className="personal-info">
              <h2>
                <u>Estado:</u>
              </h2>
              {editingDescription ? (
                <>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                  <button onClick={handleSaveDescription}>Guardar</button>
                  <button onClick={handleCancelEditDescription}>Cancelar</button>
                </>
              ) : (
                <>
                  <p>{user.description}</p>
                  {currUser && currUser.user && user.id === currUser.user.id && (
                    <button onClick={handleEditDescription}>Editar estado</button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="questionsUser">
          <FetchQuestions userId={userId} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
