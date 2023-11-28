import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useUser } from '../../pages/User/UserContext';
import "./Navbar.css";

function Navbar1() {
  const history = useHistory();
  const { currUser } = useUser();

  const handleNavigation = (path) => {
    history.push(path);
  };

  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" className={`tertiary ${isFixed ? 'fixed-top' : ''}`}>
      <Container fluid>
        <Navbar.Brand onClick={() => handleNavigation("/")}>FWD Questions</Navbar.Brand>
        <Form className="d-flex all-search">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 custom-navbar"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => handleNavigation("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavigation("/Profile")}>Profile</Nav.Link>
            <Nav.Link onClick={() => handleNavigation("/Ranking")}>Ranking</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/action3")}>Action</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/action4")}>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleNavigation("/action5")}>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>

            {/* Renderizado condicional para mostrar Logout o Signup/Login */}
            {currUser ? (
              <Nav.Link>
                <Nav.Link onClick={() => handleNavigation("/logout")}>logout</Nav.Link>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link onClick={() => handleNavigation("/Signup")}>Signup</Nav.Link>
                <Nav.Link onClick={() => handleNavigation("/Login")}>Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
