import { useState } from "react";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import ChildSetupForm from "../components/ChildSetupForm";
import styles from "../styles/app.module.css";

function ChildSetupPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const registrationData = location.state?.registrationData;

    const handleChildSetup = async (children) => {
        if (!registrationData) {
            setMessage("Please start registration from the registration page.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/register",
                {
                    ...registrationData,
                    children
                }
            );

            setMessage("");

            navigate("/dashboard", {
                state: {
                    user: response.data.user,
                    children: response.data.children
                }
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed."
            );
        }
    };

    if (!registrationData) {
        return (
            <AuthLayout
                activeView="register"
                title="Start registration first"
                description="The child setup step is opened after the parent information is completed."
            >
                <div className={styles.form}>
                    <Alert severity="warning">
                        No registration information was found.
                    </Alert>
                    <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        fullWidth
                    >
                        Go to registration
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            activeView="register"
            title="Set up child records"
            description="Add each child and select the bus preference for each one."
            message={message && <Alert severity="error">{message}</Alert>}
        >
            <ChildSetupForm onSubmit={handleChildSetup} />
        </AuthLayout>
    );
}

export default ChildSetupPage;
