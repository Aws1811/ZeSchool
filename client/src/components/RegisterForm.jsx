import { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "../styles/app.module.css";

function RegisterForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        parentName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const updateFormData = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Parent name"
                InputLabelProps={{ shrink: true }}
                name="parentName"
                value={formData.parentName}
                onChange={updateFormData}
                required
            />
            <TextField
                fullWidth
                label="Email"
                InputLabelProps={{ shrink: true }}
                name="email"
                type="email"
                value={formData.email}
                onChange={updateFormData}
                placeholder="you@example.com"
                required
            />
            <div className={styles.passwordField}>
                <TextField
                    fullWidth
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={updateFormData}
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
            <div className={styles.passwordField}>
                <TextField
                    fullWidth
                    label="Confirm password"
                    InputLabelProps={{ shrink: true }}
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={updateFormData}
                    required
                />
                <Button
                    type="button"
                    className={styles.passwordButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? "Hide" : "Show"}
                </Button>
            </div>
            <Button fullWidth type="submit" variant="contained" size="large">
                Create parent account
            </Button>
        </form>
    );
}

export default RegisterForm;
