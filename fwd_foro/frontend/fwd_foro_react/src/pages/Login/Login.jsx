import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './Login.css';
import { jwtDecode } from 'jwt-decode';
import { useUser } from "../User/UserContext";

const Login = ({ setShow }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { setCurrUser } = useUser();
  const history = useHistory();

  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3001/login";
    try {
      const response = await axios.post(url, userInfo, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        withCredentials: true,
      });

      const data = response.data;
      localStorage.setItem("token", response.headers.authorization);
      setCurrUser(data.status.data.user);
      console.log("Usuario autenticado:", data.status.data.user);

      // Redirige a la página principal ("/") después del inicio de sesión
      history.push("/");

      // Recarga la página para aplicar los cambios
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      user: {
        email: formData.email,
        password: formData.password
      }
    };
    login(userInfo, setCurrUser);
    setFormData({ email: "", password: "" });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.sub;
      axios.get(`http://localhost:3001/api/v1/users/${userId}`, {
        withCredentials: true,
      })
        .then(response => {
          const data = response.data;
          setCurrUser(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [setCurrUser]);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="register" onSubmit={handleSubmit} ref={formRef}>
            <div className="register__field">
              <i className="register__icon fas fa-user"></i>
              <input
                type="email"
                name="email"
                className="register__input"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-lock"></i>
              <input
                type="password"
                name="password"
                className="register__input"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button className="button register__submit">
              <span className="button__text">Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <div className="link" >Not registered yet, <a  href="#signup" onClick={handleClick}>Signup</a></div>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Login;
