import React from 'react';
import { useState, useEffect } from 'react';
import UserAvatars from '../../UserAvatars/UserAvatars';

const RightSidebar = ({ isFixed }) => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        // Hacer fetch al endpoint de usuarios más activos
        async function fetchTopUsers() {
            try {
                const response = await fetch("http://localhost:3001//api/v1/users/users_more_active");
                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios más activos");
                }
                const data = await response.json();
                setTopUsers(data.users_more_active); // Ajusta según la estructura de tu respuesta
                console.log(data.users_more_active, 'esta es');
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }

        // Llamar a la función al montar el componente
        fetchTopUsers();
    }, []);



    return (
        <div
            id="topUsersSidebar"
            style={{
                position: "absolute",
                top: isFixed ? "147px" : "200",
                right: "0",
                width: "300px",
                background: "#fff",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                padding: "10px",
            }}
        >
            <header style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                <h5 style={{ margin: "0", fontSize: "18px" }}>Usuarios Más Activos</h5>
                <img
                    src="/img/corona.png"
                    alt="Arrow"
                    style={{ width: "60px", marginLeft: "5px" }}
                />
            </header>
            <ul style={{ listStyle: "none", padding: "0" }}>
                {topUsers.map((user) => (
                    <li
                        key={user.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <UserAvatars userId={user.id} style={{ marginRight: "10px" }} />
                        <span style={{ fontWeight: "bold" }}>{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RightSidebar;