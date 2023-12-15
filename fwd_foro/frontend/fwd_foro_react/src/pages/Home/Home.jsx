// Home.js

import React, { useState } from "react";
import "./Home.css";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import CreateQuestionModal from "../../components/CreateQuestionModal/CreateQuestionModal";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import QuestionFilterLabels from "../../components/QuestionFilterLabels/QuestionFilterLabels";
import LikeButton from "../../components/LikeButtom/LikeButtom";

function Home() {
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <div>
      <div>
        <Navbar
          onLabelClick={(labelId) => setSelectedLabelId(labelId)}
          onSearchChange={handleSearch}
          searchQuery={searchQuery}
        />
      </div>
      <br />
      <CreateQuestionModal />
      <div>
        {selectedLabelId ? (
          <QuestionFilterLabels labelId={selectedLabelId} searchQuery={searchQuery} />
        ) : (
          <QuestionComponent searchQuery={searchQuery} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
