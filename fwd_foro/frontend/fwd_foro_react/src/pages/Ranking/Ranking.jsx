import React, { useState } from 'react';
import FetchUsers from '../../components/RankingComponents/FetcthUsers/FetcthUsers';
import PodiumQuestionPoints from '../../components/RankingComponents/PodiumQuestionPoints/PodiumQuestionPoints';
import SideBar from '../../components/RankingComponents/SideBar/SideBar';
import './Ranking.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Ranking = () => {
  const [dataType, setDataType] = useState('questions');
  const [moreType, setMoreType] = useState(''); // Nuevo estado para la segunda variable

  const handleDataTypeChange = (newType, newMoreType) => {
    setDataType(newType);
    setMoreType(newMoreType); // Establecer el nuevo valor para la segunda variable
  };

  return (
    <div>
      <Navbar></Navbar>
      <br />
      <br />
      <br />
      <br />
      <br /><br />
      <div className="ranking-container">
        <SideBar onDataTypeChange={handleDataTypeChange} />
        <div className="ranking-content">
          <PodiumQuestionPoints MoreLikes={dataType} More={moreType} />
          <FetchUsers MoreLikes={dataType} More={moreType} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Ranking;
