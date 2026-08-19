import { useState } from "react";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import DateOfBirthField from "./DateOfBirthField";
import styles from "../../App.module.css";

function RegisterForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        parentName: "",
        email: "",
        phonePrefix: "+970",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
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
                name="parentName"
                value={formData.parentName}
                onChange={updateFormData}
                required
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={updateFormData}
                required
            />
            <TextField
                fullWidth
                label="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={updateFormData}
                placeholder="059 000 0000"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TextField
                                select
                                variant="standard"
                                name="phonePrefix"
                                value={formData.phonePrefix}
                                onChange={updateFormData}
                                className={styles.phonePrefix}
                            >
                                <MenuItem value="+970">+970</MenuItem>
                                <MenuItem value="+972">+972</MenuItem>
                            </TextField>
                        </InputAdornment>
                    ),
                }}
                required
            />
            <div className={styles.formRow}>
                <TextField
                    fullWidth
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={updateFormData}
                    required
                >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                </TextField>
                <DateOfBirthField
                    value={formData.dateOfBirth}
                    onChange={updateFormData}
                />
            </div>
            <div className={styles.passwordField}>
                <TextField
                    fullWidth
                    label="Password"
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
                Continue
            </Button>
        </form>
    );
}

export default RegisterForm;
