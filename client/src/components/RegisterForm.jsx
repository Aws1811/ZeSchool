import { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    InputAdornment,
    MenuItem,
    TextField,
} from "@mui/material";
import DateOfBirthField from "./DateOfBirthField";
import styles from "../styles/app.module.css";

function RegisterForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [formData, setFormData] = useState({
        parentName: "",
        contactType: "email",
        contactValue: "",
        phonePrefix: "+970",
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
        const name = formData.parentName.trim();
        const contactValue = formData.contactValue.trim();
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue);
        const phoneIsValid = /^[0-9\s]{7,}$/.test(contactValue);

        if (name.length < 2) {
            setValidationMessage("Parent name must be at least 2 characters.");
            return;
        }
        if (formData.contactType === "email" && !emailIsValid) {
            setValidationMessage("Enter a valid email address.");
            return;
        }
        if (formData.contactType === "phone" && !phoneIsValid) {
            setValidationMessage("Enter a valid phone number.");
            return;
        }
        if (!formData.gender || !formData.dateOfBirth) {
            setValidationMessage("Gender and date of birth are required.");
            return;
        }
        if (formData.password.length < 6) {
            setValidationMessage("Password must be at least 6 characters.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setValidationMessage("Passwords do not match.");
            return;
        }

        setValidationMessage("");
        onSubmit({ ...formData, parentName: name, contactValue });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Register as parent</FormLabel>
            </FormControl>
            <TextField
                fullWidth
                label="Parent name"
                InputLabelProps={{ shrink: true }}
                name="parentName"
                value={formData.parentName}
                onChange={updateFormData}
                required
            />
            <div className={styles.contactField}>
                <TextField
                    select
                    label="Contact method"
                    InputLabelProps={{ shrink: true }}
                    name="contactType"
                    value={formData.contactType}
                    onChange={updateFormData}
                >
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone number</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label={formData.contactType === "email" ? "Email" : "Phone number"}
                    InputLabelProps={{ shrink: true }}
                    name="contactValue"
                    type={formData.contactType === "email" ? "email" : "tel"}
                    value={formData.contactValue}
                    onChange={updateFormData}
                    placeholder={formData.contactType === "email" ? "you@example.com" : "059 000 0000"}
                    InputProps={formData.contactType === "phone" ? {
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
                    } : undefined}
                    required
                />
            </div>
            <div className={styles.formRow}>
                <TextField
                    fullWidth
                    select
                    label="Gender"
                    InputLabelProps={{ shrink: true }}
                    name="gender"
                    value={formData.gender}
                    onChange={updateFormData}
                    required
                >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                </TextField>
                <DateOfBirthField value={formData.dateOfBirth} onChange={updateFormData} />
            </div>
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
                <Button type="button" className={styles.passwordButton} onClick={() => setShowPassword(!showPassword)}>
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
                <Button type="button" className={styles.passwordButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? "Hide" : "Show"}
                </Button>
            </div>
            {validationMessage && <div className={styles.formError}>{validationMessage}</div>}
            <Button fullWidth type="submit" variant="contained" size="large">
                Create parent account
            </Button>
        </form>
    );
}

export default RegisterForm;
