import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleRegisterDetails = (formData) => {
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (formData.role === "teacher") {
            navigate("/teacher/chat");
            return;
        }

        navigate("/register/children", { state: { registrationData: formData } });
    };
//register
    return (
        <AuthLayout
            activeView="register"
            title="Create your account"
            description="Choose your role and add your information to get started."
            message={message && <Alert severity="error">{message}</Alert>}
        >
            <RegisterForm onSubmit={handleRegisterDetails} />
        </AuthLayout>
    );
}

export default RegisterPage;
