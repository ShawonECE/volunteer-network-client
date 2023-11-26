import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../Utilities/logos/Group 1329.png';
import './NavigationBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase-config';

const NavigationBar = () => {
    const navigate = useNavigate();
    const defaultUser = {
        isLoggedIn: false,
        name: '',
        email: '',
        photo: ''
    };
    const app = initializeApp(firebaseConfig);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleLogOut = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            setLoggedInUser(defaultUser);
            console.log('Successfully logged out');
        })
        .catch(error => {
            console.log(error.message);
        });
    };
    const handleAdmin = () => {
        navigate('/admin');
    }
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <Navbar expand="lg" className="bg-body-transparent">
            <Container>
                <img src={logo} width="155"
                height="46"
                className="d-inline-block align-top white-logo"
                alt="Travel Guru"/>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className='nav-item'><Link to='/' style={{textDecoration: 'none'}}>Home</Link></Nav.Link>
                        <Nav.Link className='nav-item'>Donation</Nav.Link>
                        <Nav.Link className='nav-item'><Link to='/events' style={{textDecoration: 'none'}}>Events</Link></Nav.Link>
                        <Nav.Link className='nav-item'>Blog</Nav.Link>
                        {
                            loggedInUser.isLoggedIn?
                            <button onClick={handleLogOut} className='nav-item log-in-btn'>Log out</button>
                            :
                            <button className='nav-item log-in-btn' onClick={handleLogin}>Log in</button>
                        }
                        <button className='nav-item admin-btn' onClick={handleAdmin}>Admin</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;