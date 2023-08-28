import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/authContext';

const PrivateRoute = ({children, ...rest}) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return !user ? navigate('/login') : children;
}

export default PrivateRoute;