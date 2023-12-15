// Navbar.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../pages/User/UserContext";
import "./Navbar.css";
import RightSidebar from "./RightSidebar/RightSideBar";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Logout from "../../pages/Logout/Logout";

const Navbar = ({ onLabelClick, onSearchChange, searchQuery }) => {
  const history = useHistory();
  const { currUser } = useUser();
  const [isFixed, setIsFixed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isQuestionPage = location.pathname.includes('/question/');
  const placeholderText = isQuestionPage ? 'Filtrar respuestas...' : 'Buscar preguntas...';

  const handleNavigation = (path) => {
    history.push(path);
  };

  const handleScroll = () => {
    setIsFixed(window.scrollY > 0);
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleScreenResize = () => {
    // Actualiza el estado para mostrar u ocultar el RightSidebar
    setIsRightSidebarVisible(window.innerWidth >= 1420);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('resize', handleScreenResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <nav
        expand="lg"
        className={`navbar ${isFixed ? "fixed-top" : ""}`}
        style={{
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <img
          src="/img/logoNav.jpg"
          alt="Logo"
          className="navbar__logo"
          style={{ width: "250px", marginLeft: "50px" }}
        />
        {isHomePage && (
          <button
            onClick={toggleSidebarVisibility}
            className="navbar__button"
            style={{
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              color: "white",
              fontSize: "18px",
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 80% 100%, 50% 130%, 20% 100%, 0 100%)",
            }}
          >
            Temas
          </button>)}
        <ul
          className="navbar__menu"
          style={{
            cursor: "pointer",
            display: "flex",
            listStyleType: "none",
            margin: "0",
            padding: "0",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <li className="navbar__menu-item" onClick={() => handleNavigation("/")}>
            Inicio
          </li>
          {currUser ? (
            <li
              className="navbar__menu-item"
              onClick={() => handleNavigation(`/Profile/${currUser.user.id}`)}
            >
              Profile
            </li>
          ) : null}
          <li
            className="navbar__menu-item"
            onClick={() => handleNavigation("/Ranking")}
          >
            Ranking
          </li>
          {currUser ? (
            <li>
              <Logout></Logout>
            </li>
          ) : (
            <>
              <li
                className="navbar__menu-item"
                onClick={() => handleNavigation("/Signup")}
              >
                Signup
              </li>
              <li
                className="navbar__menu-item"
                onClick={() => handleNavigation("/Login")}
              >
                Login
              </li>
            </>
          )}
        </ul>
        <div
          className="navbar__language"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "50px",
          }}
        >
          <div
            className="d-flex all-search"
            style={{
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              color: "white",
            }}
          >
            <div className="search-container">
              <input
                type="text"
                placeholder={placeholderText}
                name="search"
                value={searchQuery}
                onChange={onSearchChange}
              />
            </div>
          </div>
        </div>
      </nav>
      {
        isHomePage && (
          <div style={{ marginTop: isFixed ? "147px" : "", position: "relative" }}>
            <>
              <LeftSidebar
                isSidebarVisible={isSidebarVisible}
                onLabelClick={onLabelClick}
                toggleSidebarVisibility={toggleSidebarVisibility}
              />
              {isRightSidebarVisible && <RightSidebar isFixed={isFixed} />}
            </>
          </div>)
      }
    </div >
  );
};

export default Navbar;
