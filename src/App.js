import { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/Login/Login';

export const UserContext = createContext();

function App() {
  const defaultUser = {
    isLoggedIn: false,
    name: '',
    email: '',
    photo: ''
  };
  const [loggedInUser, setLoggedInUser] = useState(defaultUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
