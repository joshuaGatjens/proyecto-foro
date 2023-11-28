import React, { useState } from 'react';
import "./RegisterComponent.css";

const RegisterComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = async () => {
    try {
      console.log('Making signup request...');
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: name,
            email: email,
            password: password,
          },
        }),
        credentials: 'include',
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        try {
          const textData = await response.text();
          const data = textData.trim() ? JSON.parse(textData) : null;
          console.log('Registro exitoso', data);
        } catch (jsonError) {
          console.error('Error al parsear JSON de la respuesta', jsonError);
        }
      } else {
        const errorData = await response.text();
        if (errorData.trim() !== '') {
          console.error('Registro fallido', errorData);
        } else {
          console.error('Registro fallido. Sin detalles adicionales.');
        }
      }
    } catch (error) {
      console.error('Error al intentar registrarse', error);
    }
  };


  return (
<div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="register">
      <div className="register__field">
					<i className="register__icon fas fa-user"></i>
					<input type="text" className="register__input" placeholder="Nombre"></input>
				</div>
				<div className="register__field">
					<i className="register__icon fas fa-user"></i>
					<input type="text" className="register__input" placeholder="Correo Electrónico"></input>
				</div>
				<div className="register__field">
					<i className="register__icon fas fa-lock"></i>
					<input type="password" className="register__input" placeholder="Contraseña"></input>
				</div>
				<button className="button register__submit">
					<span className="button__text">Register</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
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

export default RegisterComponent;
