import { useState } from "react";
import { Alert, Button, TextField, Typography } from "@mui/material";
import styles from "../styles/app.module.css";

function LoginForm({ onSubmit, message, teacherAccounts = [], onTeacherSelect }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <TextField
                fullWidth
                label="Email or phone number"
                name="loginIdentifier"
                placeholder="you@example.com or 059 000 0000"
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
            {teacherAccounts.length > 0 && (
                <div className={styles.teacherAccess}>
                    <Typography className={styles.teacherAccessTitle}>Teacher access</Typography>
                    <Typography className={styles.teacherAccessDescription}>Choose a predefined teacher account.</Typography>
                    <div className={styles.teacherAccessList}>
                        {teacherAccounts.map((teacher) => (
                            <Button
                                key={teacher.id}
                                type="button"
                                variant="outlined"
                                onClick={() => onTeacherSelect(teacher)}
                            >
                                {teacher.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            {message && <Alert severity="error">{message}</Alert>}
        </form>
    );
}

export default LoginForm;
