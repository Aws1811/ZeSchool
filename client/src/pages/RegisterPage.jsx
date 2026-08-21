import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleRegisterDetails = async (formData) => {
        const name =
            formData.role === "teacher"
                ? formData.teacherName
                : formData.parentName;

        if (!name.trim()) {
            setMessage("Name cannot be empty.");
            return;
        }

        if (formData.contactType === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(formData.contactValue.trim())) {
                setMessage("Please enter a valid email address.");
                return;
            }
        }

        if (formData.contactType === "phone") {
            const phone = formData.contactValue.replace(/\s/g, "");
            const phoneRegex = /^(059|056)\d{7}$/;

            if (!phoneRegex.test(phone)) {
                setMessage("Please enter a valid Palestinian mobile number.");
                return;
            }
        }

        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();

        if (birthDate > today) {
            setMessage("Date of birth cannot be in the future.");
            return;
        }

        if (formData.role === "parent") {
            let age = today.getFullYear() - birthDate.getFullYear();

            const monthDifference =
                today.getMonth() - birthDate.getMonth();

            if (
                monthDifference < 0 ||
                (monthDifference === 0 &&
                    today.getDate() < birthDate.getDate())
            ) {
                age--;
            }

            if (age < 18) {
                setMessage("Parent must be at least 18 years old.");
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (formData.role === "parent") {
            setMessage("");

            navigate("/register/children", {
                state: {
                    registrationData: formData
                }
            });

            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/register",
                {
                    ...formData,
                    children: []
                }
            );

            setMessage("");

            localStorage.setItem("zeschoolUser", JSON.stringify(response.data.user));
            localStorage.setItem("zeschoolChildren", JSON.stringify([]));

            navigate("/teacher-dashboard", {
                state: {
                    user: response.data.user
                }
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed."
            );
        }
    };

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

