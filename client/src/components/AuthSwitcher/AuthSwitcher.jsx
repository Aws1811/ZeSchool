import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../../App.module.css";

function AuthSwitcher({ activeView }) {
    return (
        <div className={styles.switcher}>
            <Button
                component={Link}
                to="/login"
                className={activeView === "login" ? styles.activeButton : styles.switchButton}
                variant={activeView === "login" ? "contained" : "text"}
            >
                Login
            </Button>
            <Button
                component={Link}
                to="/register"
                className={activeView === "register" ? styles.activeButton : styles.switchButton}
                variant={activeView === "register" ? "contained" : "text"}
            >
                Register
            </Button>
        </div>
    );
}

export default AuthSwitcher;
