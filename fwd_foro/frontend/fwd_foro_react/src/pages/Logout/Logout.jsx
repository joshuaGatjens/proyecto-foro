import React from "react";
import { useUser } from "../../pages/User/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const { currUser, setCurrUser } = useUser();
  const history = useHistory(); // Obtén el objeto history

  const logout = async () => {
    const url = "http://localhost:3001/logout";
    try {
      await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        withCredentials: true,
      });

      localStorage.removeItem("token"); // Elimina el token almacenado
      setCurrUser(null); // O cualquier lógica necesaria para limpiar la información del usuario
      console.log("Usuario desautenticado");

      // Utiliza history para redirigir a la página principal ("/") después del cierre de sesión
      history.push("/");

      // Recarga la página para aplicar los cambios
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <li class="navbar__menu nav bar__menu-item" >
      <div value="Logout" onClick={handleClick} > Logout</div>
    </li>
  );
};

export default Logout;
