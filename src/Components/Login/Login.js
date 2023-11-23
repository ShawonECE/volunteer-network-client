import React, { useContext } from 'react';
import './Login.css';
import google from '../../Utilities/logos/google.png';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';

const Login = () => {
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
        })
        .catch(error => console.log(error));
    }
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