import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Sidebar.css"

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Lenguajes
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>FrontEnd:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <button className="label-html"><h6>HTML</h6></button>
            <br />
            <br />
            <button className="label-css"><h6>CSS</h6></button>
            <br />
            <br />
            <button className="label-javascript"><h6>JavaScript</h6></button>
            <br />
            <br />
            <button className="label-react"><h6>React</h6></button>
            <br />
            <br />
            <button className="label-typescript"><h6>TypeScript</h6></button>
          </ul>

          <Offcanvas.Title>BackEnd</Offcanvas.Title>
          <br></br>
          <ul>
            <button className="label-ruby"><h6>Ruby</h6></button>
            <br />
            <br />
            <button className="label-mysql"><h6>MySQL</h6></button>
            <br />
            <br />
            <button className="label-docker"><h6>Docker DB</h6></button>
            <br />
            <br />
            <button className="label-mongo"><h6>Mongo DB</h6></button>
            <br />
            <br />
            <button className="label-rails"><h6>Rails</h6></button>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;