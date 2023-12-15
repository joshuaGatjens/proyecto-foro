import { useState, useEffect } from "react";
import axios from 'axios';
// import './PrivateText.css';

const PrivateText = ({ currUser }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getText = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get("http://localhost:3001/private/test", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error('Empty response data');
      }

      setMessage(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Error fetching private text:", error);
      setMessage(null);
      setError(error.message || 'Error fetching private text');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currUser) {
      getText();
    }
  }, [currUser]);

  return (
    <div className="private-text-container">
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default PrivateText;
