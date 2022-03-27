import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../store/configureStore";


const PrivateRoute = ({Component}: any) => {
    const location = useLocation()
    const {user} = useAppSelector(state => state.account)
    return user ? <Component/> : <Navigate to={'/login'} state={{from: location}}/>
};

export default PrivateRoute;
