import React from "react";
import "./Home.css";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import Navbar1 from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
// import UserProfile from "../UserProfile/UserProfile";
import CreateQuestions from "../../components/CreateQuestions/CreateQuestions";
import CreateQuestionModal from "../../components/CreateQuestionModal/CreateQuestionModal"
import SideBarHome from '../../components/SideBarHome/SideBarHome'
function Home() {
  return (
    <div>
      <div>
        <Navbar1></Navbar1>
        {/* <br />
        <br />
        <br />
       */}
      <SideBarHome></SideBarHome>
      </div>
      <br/>
        <CreateQuestionModal></CreateQuestionModal>
      <div>
        <QuestionComponent></QuestionComponent>
      </div>

      <h1> Sean bienvenidos, esperamos que se vayan BIEN-VENIDOS </h1>


    </div>
  );
}

export default Home;
