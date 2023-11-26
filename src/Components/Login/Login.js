import React, { useContext } from 'react';
import './Login.css';
import google from '../../Utilities/logos/google.png';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const handleLogin = () => {
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const userLoggedIn = {
            isLoggedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
            };
            setLoggedInUser(userLoggedIn);
            storeAuthToken();
            
            if(location.state?.from) {
                navigate(location.state.from);
            }
        })
        .catch(error => console.log(error));
    }

    const storeAuthToken = () => {
        getAuth().currentUser.getIdToken(true).then(function(idToken) {
          sessionStorage.setItem('authToken', idToken);
        }).catch(function(error) {
          console.log(error);
        });
      };
    return (
        <div>
            <br /><br /><br /><br /><br />
            <h2 className='text-center'>{loggedInUser.isLoggedIn? <>You are already logged in, {loggedInUser.name}</>:<>Please log in here</>}</h2>
            <br />
            <div className='d-flex justify-content-center'>
                <div onClick={handleLogin} id='login-btn' className='d-flex align-items-center justify-content-center'>
                    <img src={google} id='google-img' alt="" />
                    <p>Log in with Google</p>
                </div>
            </div>
        </div>
    );
};

export default Login;