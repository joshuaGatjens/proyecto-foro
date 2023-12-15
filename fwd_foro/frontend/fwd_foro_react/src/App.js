import { useState } from 'react';
import './App.css';
import User from './pages/User/User';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './pages/User/UserContext';
// import QuestionList from './components/Fetch/Fetch';
import AppRoutes from './AppRoutes';
import Logout from './pages/Logout/Logout';
import { useUser } from './pages/User/UserContext';


const App = () => {
  return (
    <UserProvider>
      <div className="App fixed-background">
        
        <AppRoutes />
        
      </div>
    </UserProvider>
  );
};

export default App;
