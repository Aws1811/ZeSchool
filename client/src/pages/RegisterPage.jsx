import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";
import { registerParentAccount } from "../api/authApi";

function RegisterPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleRegisterDetails = async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await registerParentAccount({
                displayName: formData.parentName,
                email: formData.email,
                password: formData.password,
            });
            setMessage("");
            navigate("/dashboard", { state: { email: response.user.email } });
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not create the parent account.");
        }
    };

    return (
        <AuthLayout
            activeView="register"
            title="Create your parent account"
            description="Register once, then your assigned students will appear in your dashboard."
            message={message && <Alert severity="error">{message}</Alert>}
        >
            <RegisterForm onSubmit={handleRegisterDetails} />
        </AuthLayout>
    );
}

export default RegisterPage;
