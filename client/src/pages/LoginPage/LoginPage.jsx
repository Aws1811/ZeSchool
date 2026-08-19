import { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage() {
    const [message, setMessage] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        setMessage("Login is ready for backend connection.");
    };

    return (
        <AuthLayout
            activeView="login"
            title="Welcome back"
            description="Enter your email or phone number to continue."
        >
            <LoginForm onSubmit={handleLogin} message={message} />
        </AuthLayout>
    );
}

export default LoginPage;
