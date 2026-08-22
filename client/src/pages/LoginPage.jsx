import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import { loginAccount } from "../api/authApi";
import { getDemoAccounts } from "../api/chatApi";

function LoginPage() {
    const navigate = useNavigate();
    const [teacherAccounts, setTeacherAccounts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getDemoAccounts()
            .then((accounts) => setTeacherAccounts(accounts.teachers || []))
            .catch(() => setTeacherAccounts([]));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const response = await loginAccount({
                email: formData.get("loginIdentifier"),
                password: formData.get("loginPassword"),
            });
            setMessage("");
            const dashboardPath = response.user.role === "teacher" ? "/teacher-dashboard" : "/dashboard";
            navigate(dashboardPath, { state: { email: response.user.email } });
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not log in.");
        }
    };

    const handleTeacherLogin = (teacher) => {
        navigate("/teacher-dashboard", { state: { email: teacher.email } });
    };

    return (
        <AuthLayout
            activeView="login"
            title="Welcome back"
            description="Log in as a parent or choose one of the predefined teacher accounts."
            message={message && <Alert severity="error">{message}</Alert>}
        >
            <LoginForm
                onSubmit={handleLogin}
                message={message}
                teacherAccounts={teacherAccounts}
                onTeacherSelect={handleTeacherLogin}
            />
        </AuthLayout>
    );
}

export default LoginPage;
