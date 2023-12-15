import React, { useEffect, useState } from 'react';
import './FetcthUsers.css'; // Asegúrate de tener el archivo de estilos

const TopUsersComponent = ({ MoreLikes = 'questions', More = null }) => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        let endpoint;

        if (More) {
          endpoint = `${More}/users_by_more_${More}`;
        } else {
          endpoint = `${MoreLikes}/top_users`;
  
        }

        const response = await fetch(`http://localhost:3001/api/v1/${endpoint}`);
        console.log(endpoint,'fecth');
        const data = await response.json();

        // Verificar si data.top_users o data.users_by_more está definido antes de usar setTopUsers
        if (data && (data.top_users || data.users_by_more)) {
          if (data.top_users) {
            setTopUsers(data.top_users);
          } else {
            setTopUsers(data.users_by_more);
          }
        } else {
          // Manejar el caso donde top_users no está definido
          console.error(
            `Error fetching top users for ${MoreLikes}: top_users is undefined`
          );
        }
      } catch (error) {
        console.error(`Error fetching top users for ${MoreLikes}:`, error);
      }
    };

    // Llamar a la función de fetch
    fetchTopUsers();
  }, [MoreLikes, More]);

  return (
    <div className="top-users-container">
      <h2><u>Top Users</u></h2>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Puntos totales</th>
          </tr>
        </thead>
        <tbody>
          {topUsers
            .sort((a, b) => b.total_points - a.total_points)
            .map((user, index) => (
              <tr key={index} className={index < 3 ? `top-${index + 1}` : ''}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.total_points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopUsersComponent;
