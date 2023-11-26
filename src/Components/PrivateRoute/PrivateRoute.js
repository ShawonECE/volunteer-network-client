import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = () => {
    const location = useLocation();
    const [loggedInUser] = useContext(UserContext);
    return (
        <div>
            {
                loggedInUser.isLoggedIn ? <Outlet/> : <Navigate to="/login" replace state={{from: location}} />
            }
        </div>
    );
};

export default PrivateRoute;