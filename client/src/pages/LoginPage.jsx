import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const loginData = {
            loginIdentifier: formData.get("loginIdentifier"),
            loginPassword: formData.get("loginPassword")
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/login",
                loginData
            );

            setMessage("");

            navigate("/dashboard", {
                state: {
                    user: response.data.user,
                    children: response.data.children
                }
            });
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <AuthLayout
            activeView="login"
            title="Welcome back"
            description="Enter your email or phone number to continue."
        >
            <LoginForm
                onSubmit={handleLogin}
                message={message}
            />
        </AuthLayout>
    );
}

export default LoginPage;