import { useRef, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useUser } from "../User/UserContext";
import './Signup.css';

const Signup = ({ setShow }) => {
  const { currUser, setCurrUser } = useUser();
  const formRef = useRef();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signup = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3001/signup";
    try {
      const response = await axios.post(url, userInfo, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      const data = response.data;
      localStorage.setItem("token", response.headers.authorization);
      setCurrUser(data);

      const decodedToken = jwtDecode(response.headers.authorization);
      console.log("Usuario registrado:", decodedToken);

      history.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 2 || formData.name.length > 15) {
      setNameError("El nombre debe tener entre 2 y 15 caracteres");
      return;
    } else {
      setNameError("");
    }

    if (formData.password.length < 8) {
      setPasswordError("La contraseña es muy corta (mínimo 8 caracteres)");
      return;
    } else {
      setPasswordError("");
    }

    const userInfo = {
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
    };
    
    signup(userInfo, setCurrUser);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="register" onSubmit={handleSubmit} ref={formRef}>
            <div className="register__field">
              <i className="register__icon fas fa-user"></i>
              <input
                type="text"
                className="register__input"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {nameError && <div className="error-message">{nameError}</div>}
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-user"></i>
              <input
                type="text"
                className="register__input"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-lock"></i>
              <input
                type="password"
                className="register__input"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            <button className="button register__submit">
              <span className="button__text">Register</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <div>Do you already have an account, <a href="#login" onClick={handleClick}>login</a></div>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
