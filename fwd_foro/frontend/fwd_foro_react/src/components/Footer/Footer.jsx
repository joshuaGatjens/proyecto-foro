// Footer.js

import React from 'react';
import './Footer.css';
// import logoImage from './ruta/de/la/imagen/logo.png'; // Reemplaza con la ruta correcta de tu imagen

function Footer() {
  return (
    <footer>
      <div className="middle">
        <img
          src="/img/logoNav.jpg"
          alt="Logo"
          className="navbar__logo"
          style={{ width: "250px", height: "120px", marginLeft: "-200px" }} // Ajusta el valor de marginLeft
        />
        <div className="column">
          <h3>FWD</h3>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Programa</a></li>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>SOCIAL</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>CONTACTO</h3>
          <p>info@fwdcostarica.com</p>
          <p>Tel: 506 7202 5228</p>
          <p>Costa Rica</p>
        </div>
      </div>
      <div className="right">
      </div>
      <div className="left footer-bottom">
        <div className="logo">
        </div>
        <p>© 2024 por FWD</p>
      </div>
    </footer>
  );
}

export default Footer;
