import React, { useEffect, useState } from "react";
import "./PodiumQuestionPoints.css"; // Asegúrate de tener el archivo de estilos
import UserAvatars from "../../UserAvatars/UserAvatars";

const PodiumComponent = ({ MoreLikes = "questions", More = null }) => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        let endpoint;

        if (More) {
          endpoint = `${More}/users_by_more_${More}`;
          setTitle("Más preguntones");
        } else {
          endpoint = `${MoreLikes}/top_users`;
          setTitle(
            MoreLikes === "questions"
              ? "Preguntas con más likes"
              : "Respuestas con más likes"
          );
        }

        const response = await fetch(
          `http://localhost:3001/api/v1/${endpoint}`
        );
        const data = await response.json();
        console.log(endpoint);
        console.log("data", data);

        if (data && (data.top_users || data.users_by_more)) {
          if (data.top_users) {
            setTopUsers(data.top_users.slice(0, 3));
          } else if (data.users_by_more) {
            setTopUsers(data.users_by_more.slice(0, 3));
          } else {
            console.error(
              `Error fetching top users for ${MoreLikes}: top_users is undefined`
            );
          }
        } else {
          console.error(
            `Error fetching top users for ${MoreLikes}: top_users is undefined`
          );
        }

        setLoading(false);
      } catch (error) {
        console.error(`Error fetching top users for ${MoreLikes}:`, error);
      }
    };

    fetchTopUsers();
  }, [MoreLikes, More]);

  return (
    <div>
      <h1>Mejores puntuaciones:</h1>
      <div className="podium-container">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <>
            {/* Silver */}
            <div className="podium-item">
              <div className="user-avatars-container">
                <UserAvatars userId={topUsers[1]?.id} />
              </div>
              <div className="podium-name">{topUsers[1]?.email}</div>
              <div className={`podium-step podium-step-2 silver`}>
                <div className="podium-number">2</div>
              </div>
            </div>

            {/* Gold */}
            <div className="podium-item">
              <div className="user-avatars-container">
                <UserAvatars userId={topUsers[0]?.id} />
              </div>
              <div className="podium-name">{topUsers[0]?.email}</div>
              <div className={`podium-step podium-step-1 gold`}>
                <div className="podium-number">1</div>
              </div>
            </div>

            {/* Bronze */}
            <div className="podium-item">
              <div className="user-avatars-container">
                <UserAvatars userId={topUsers[2]?.id} />
              </div>
              <div className="podium-name">{topUsers[2]?.email}</div>
              <div className={`podium-step podium-step-3 bronze`}>
                <div className="podium-number">3</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PodiumComponent;
