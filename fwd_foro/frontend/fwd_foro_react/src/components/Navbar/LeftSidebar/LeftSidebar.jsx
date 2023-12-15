import React from 'react'
import { useEffect, useState } from 'react';

function LeftSidebar({ isSidebarVisible, onLabelClick, toggleSidebarVisibility }) {
    const [labels, setLabels] = useState([{ id: null, name: "General" }]);


    useEffect(() => {
        // Definir la función para obtener las etiquetas desde la API
        async function fetchLabels() {
            try {
                const response = await fetch("http://localhost:3001/api/v1/labels/");
                if (!response.ok) {
                    throw new Error("Error al obtener las etiquetas");
                }
                const data = await response.json();
                setLabels([{ id: null, name: "General" }, ...data]); // Agregar "Todas" al inicio del array
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }

        // Llamar a la función al montar el componente
        fetchLabels();
    }, []);
    return (
        <div>
            <div id="sidebar" className={isSidebarVisible ? "visible" : ""}>
                <header>
                    <h5>¿Buscas algún tema en específico?</h5>

                </header>
                <ul>
                    {labels.map((label) => (
                        <li key={label.id}>
                            <button
                                type="button"
                                className="label-button"
                                onClick={() => {
                                    onLabelClick(label.id);
                                    toggleSidebarVisibility();
                                }}
                            >
                                {label.name}
                                <img
                                    src="/img/Flechas-02.png"
                                    alt="Arrow"
                                    style={{ width: "20px", marginLeft: "5px" }}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="sidebar" style={{ zIndex: '10' }} className={isSidebarVisible ? "visible" : ""}>
                <header>
                    <h5>¿Buscas algún tema en específico?</h5>
                    <img
                        src="/img/FWD-Sintesis-01.png"
                        alt="Arrow"
                        style={{ width: "90px", marginLeft: "5px" }}
                    />
                </header>
                <ul>
                    {labels.map((label) => (
                        <li key={label.id}>
                            <button
                                type="button"
                                className="label-button"
                                onClick={() => {
                                    onLabelClick(label.id);
                                    toggleSidebarVisibility();
                                }}
                            >
                                {label.name}
                                <img
                                    src="/img/Flechas-02.png"
                                    alt="Arrow"
                                    style={{ width: "20px", marginLeft: "5px" }}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div></div>
    )
}

export default LeftSidebar