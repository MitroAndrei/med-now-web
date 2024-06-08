import useAuth from "./core/useAuth";
import {TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {

    const {user,signIn,logOut} = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogIn = () => {
        signIn(email,password).then(() => {
            navigate("/");
        });
    }

    return (
        <div>
            <TextField label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogIn}>Login</button>
        </div>
    )
}