import { useState } from "react";
import { Alert, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import styles from "../App.module.css";

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
            <FormControlLabel
                control={<Checkbox size="small" />}
                label="Remember me"
                className={styles.remember}
            />
            <Button fullWidth type="submit" variant="contained" size="large">
                Login
            </Button>
            <Button type="button" className={styles.forgotButton}>
                Forgot password?
            </Button>
            <Typography className={styles.futureNote}>
                Passkey login can be added in a future authentication update.
            </Typography>
            {message && <Alert severity="info">{message}</Alert>}
        </form>
    );
}

export default LoginForm;
