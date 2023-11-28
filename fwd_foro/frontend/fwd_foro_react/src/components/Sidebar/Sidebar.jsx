import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Example() {
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
            <li className="label-html">HTML</li>
            <li className="label-css">CSS</li>
            <li className="label-javascript">JavaScript</li>
            <li className="label-react">React</li>
            <li className="label-typescript">TypeScript</li>
          </ul>

          <Offcanvas.Title>BackEnd</Offcanvas.Title>
          <br></br>
          <ul>
            <li className="label-ruby">Ruby</li>
            <li className="label-mysql">MySQL</li>
            <li className="label-docker">Docker DB</li>
            <li className="label-mongo">Mongo DB</li>
            <li className="label-rails">Rails</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;