import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "./core/useAuth";
import CustomRoute from "./core/CustomRoutes";
import {MainPage} from "./main_page/MainPage";
import {LoginPage} from "./core/LoginPage";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {

    const {user} = useAuth();

    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route element={<CustomRoute user={user}/>}>
                            <Route path="/" element={<MainPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </div>
    );
}

export default App;
