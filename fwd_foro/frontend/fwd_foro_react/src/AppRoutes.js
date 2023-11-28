// AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './pages/User/User';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import CreateQuestions from './components/CreateQuestions/CreateQuestions';
import { UserProvider } from './pages/User/UserContext';
import Logout from './pages/Logout/Logout';
import { useUser } from './pages/User/UserContext';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
const AppRoutes = () => {
    const { currUser, setCurrUser } = useUser();
      const [show, setShow] = useState(true);

  return (
    <UserProvider>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/question/:id" component={QuestionDetailPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/create" component={CreateQuestions}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login"  component={Login}/>
      </Switch>
    </Router>
    </UserProvider>
  );
};

export default AppRoutes;
