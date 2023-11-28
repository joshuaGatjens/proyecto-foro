import React from 'react';
import './SideBarHome.css'; // Asegúrate de tener tu archivo de estilos (puedes adaptar los estilos según tus necesidades)

const SideBarHome = () => {
  return (
    <div id="viewport">
      {/* Sidebar */}
      <div id="sidebar">
        <header>
          <a href="#">My App</a>
        </header>
        <ul className="nav">
          <li>
            <a href="#">
              <i className="zmdi zmdi-view-dashboard"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-link"></i> Shortcuts
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-widgets"></i> Overview
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-calendar"></i> Events
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-info-outline"></i> About
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-settings"></i> Services
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-comment-more"></i> Contact
            </a>
          </li>
        </ul>
      </div>
      {/* Content */}
      {/* <div id="content">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">
                  <i className="zmdi zmdi-notifications text-danger"></i>
                </a>
              </li>
              <li><a href="#">Test User</a></li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <h1>Simple Sidebar</h1>
          <p>
            Make sure to keep all page content within the
            <code>#content</code>.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default SideBarHome;
