// Formulario.js
import React, { useState } from 'react';

const Formulario = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Puedes agregar otros campos al formulario si es necesario
      // formData.append('name', 'John Doe');

      onFileUpload(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Subir Archivo</button>
    </form>
  );
};

export default Formulario;
