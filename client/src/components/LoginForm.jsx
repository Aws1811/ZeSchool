import { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "../styles/form.module.css";

function LoginForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <TextField fullWidth label="Email or phone number" name="loginIdentifier" required />
            <div className={styles.passwordField}>
                <TextField
                    fullWidth
                    label="Password"
                    name="loginPassword"
                    type={showPassword ? "text" : "password"}
                    required
                />
                <Button type="button" className={styles.passwordButton} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                </Button>
            </div>
            <Button fullWidth type="submit" variant="contained" size="large">Login</Button>
        </form>
    );
}

export default LoginForm;
