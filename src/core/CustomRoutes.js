import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {MainPage} from "../main_page/MainPage";
import useAuth from "./useAuth";


const CustomRoute = ({ user }) => {

    return user ? <Outlet/> : <Navigate to="/login"/>;
};

export default CustomRoute;
