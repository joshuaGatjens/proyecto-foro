import React, { useState } from "react";
import "./AuthComponent.css";
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
        credentials: "same-origin",
      });

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        // Utiliza navigate para redirigir a la ruta deseada
        navigate("/home");
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión", error);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="email"
                className="login__input"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button login__submit" onClick={handleLogin}>
              <span className="button__text">Iniciar sesión</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              {/* Agrega aquí tus iconos o botones para iniciar sesión con redes sociales */}
            </div>
          </div>
        </div>
        <div className="screen__background">
          {/* <span className="screen__background__shape screen__background__shape4"></span> */}
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
