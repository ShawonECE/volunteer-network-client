import { createContext, useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Events from './Components/Events/Events';
import Admin from './Components/Admin/Admin';

export const UserContext = createContext();
export const WorkContext = createContext();

function App() {
  const [works, setWorks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/works')
    .then(res => res.json())
    .then(data => setWorks(data));
}, []);
  const defaultUser = {
    isLoggedIn: false,
    name: '',
    email: '',
    photo: ''
  };
  const [loggedInUser, setLoggedInUser] = useState(defaultUser);
  return (
    <WorkContext.Provider value={[works, setWorks]}>
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/events' element={<Events/>}/>
          </Route>
          <Route path='/admin' element={<Admin />}/>
        </Routes>
      </Router>
    </UserContext.Provider>
    </WorkContext.Provider>
  );
}

export default App;
