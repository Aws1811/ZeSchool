import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        navigate("/dashboard");
    };

    return (
        <AuthLayout
            activeView="login"
            title="Welcome back"
            description="Enter your email or phone number to continue."
        >
            <LoginForm onSubmit={handleLogin} />
        </AuthLayout>
    );
}

export default LoginPage;
