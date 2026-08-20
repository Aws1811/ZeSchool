import { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import styles from "../styles/app.module.css";

function LoginForm({ onSubmit, message }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <TextField
                fullWidth
                label="Email or phone number"
                name="loginIdentifier"
                placeholder="you@example.com"
                required
            />
            <div className={styles.passwordField}>
                <TextField
                    fullWidth
                    label="Password"
                    name="loginPassword"
                    type={showPassword ? "text" : "password"}
                    required
                />
                <Button
                    type="button"
                    className={styles.passwordButton}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Hide" : "Show"}
                </Button>
            </div>
            <Button fullWidth type="submit" variant="contained" size="large">
                Login
            </Button>
            {message && <Alert severity="info">{message}</Alert>}
        </form>
    );
}

export default LoginForm;
