import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function RegisterPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleRegisterDetails = (formData) => {
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setMessage("");
        navigate("/register/children", { state: { registrationData: formData } });
    };

    return (
        <AuthLayout
            activeView="register"
            title="Create your parent account"
            description="Add your information to get started."
            message={message && <Alert severity="error">{message}</Alert>}
        >
            <RegisterForm onSubmit={handleRegisterDetails} />
        </AuthLayout>
    );
}

export default RegisterPage;
