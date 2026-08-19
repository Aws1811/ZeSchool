import { useState } from "react";
import { Alert, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import ChildSetupForm from "../components/ChildSetupForm";
import styles from "../App.module.css";

function ChildSetupPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const registrationData = location.state?.registrationData;

    const handleChildSetup = (children) => {
        if (!registrationData) {
            setMessage("Please start registration from the registration page.");
            return;
        }
        setMessage(`Registration is ready with ${children.length} child record(s).`);
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
                    <Button component={Link} to="/register" variant="contained" fullWidth>
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
            description="Choose how many children to add and select the bus preference for each one."
            message={message && <Alert severity="info">{message}</Alert>}
        >
            <ChildSetupForm onSubmit={handleChildSetup} />
            <Button
                type="button"
                className={styles.forgotButton}
                onClick={() => navigate("/register", { replace: true })}
            >
                Back to parent information
            </Button>
        </AuthLayout>
    );
}

export default ChildSetupPage;
