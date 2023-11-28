// components/PrivateRoute/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Route as ReactRoute, Navigate, useLocation } from 'react-router-dom';
import './PrivateRoute.css'
const PrivateRoute = ({ element, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth_status', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.authenticated);
        } else {
          console.error('Error al verificar el estado de autenticación');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    checkAuthStatus();
  }, [location.pathname]);

  if (isLoggedIn === null) {
    return <div>Cargando...</div>;
  }

  // Si el usuario está autenticado, redirige al home, de lo contrario, redirige al login
  return isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
