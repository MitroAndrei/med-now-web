import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {auth} from "./core/firebase";
import useAuth from "./core/useAuth";
import CustomRoute from "./core/CustomRoutes";
import {MainPage} from "./main_page/MainPage";
import {LoginPage} from "./LoginPage";
import {useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

function App() {


    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        {/*<Route element={<CustomRoute />}>*/}
                        <Route path="/" element={<MainPage/>}/>
                        {/*</Route>*/}
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </div>
    );
}

export default App;
