import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import styles from "../styles/form.module.css";

function LoginPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        setMessage("Backend authentication is not connected yet. Use a preview button below.");
    };
// the  alert for the massege
    return (
        <AuthLayout
            activeView="login"
            title="Welcome back"
            description="Enter your account information to continue."
        >
            
            <LoginForm onSubmit={handleLogin} />
            {message && <Alert severity="info">{message}</Alert>}
            <div className={styles.previewButtons}>
                <Button variant="outlined" onClick={() => navigate("/parent/chat")}>Preview parent</Button>
                <Button variant="outlined" onClick={() => navigate("/teacher/chat")}>Preview teacher</Button>
            </div>
        </AuthLayout>
    );
}


export default LoginPage;
