import useAuth from "./useAuth";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { user, signIn, logOut } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogIn = () => {
        signIn(email, password).then(() => {
            navigate("/");
        });
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '40px', maxWidth: '400px', width: '100%' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                    onClick={handleLogIn}
                >
                    Login
                </Button>
            </Paper>
        </div>
    );
}
