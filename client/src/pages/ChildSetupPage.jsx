import { Alert, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import ChildSetupForm from "../components/ChildSetupForm";
<<<<<<< HEAD
import styles from "../styles/app.module.css";
=======
>>>>>>> 7610231 (structure for all pages)

function ChildSetupPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const registrationData = location.state?.registrationData;

    if (!registrationData) {
        return (
            <AuthLayout
                activeView="register"
                title="Start registration first"
                description="Child setup is only part of parent registration."
            >
                <Alert severity="warning">No parent registration information was found.</Alert>
                <Button component={Link} to="/register" variant="contained" fullWidth>Go to registration</Button>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            activeView="register"
            title="Set up your children"
            description="Add the children connected to this parent account."
        >
            <ChildSetupForm onSubmit={() => navigate("/parent/chat")} />
        </AuthLayout>
    );
}

export default ChildSetupPage;
