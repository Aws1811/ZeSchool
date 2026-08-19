import { useState } from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import DateOfBirthField from "./DateOfBirthField";
import styles from "../styles/form.module.css";

function RegisterForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        role: "parent",
        parentName: "",
        teacherName: "",
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
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>I am registering as</FormLabel>
                <RadioGroup row name="role" value={formData.role} onChange={updateFormData}>
                    <FormControlLabel value="parent" control={<Radio />} label="Parent" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                </RadioGroup>
            </FormControl>

            <TextField
                fullWidth
                label={formData.role === "parent" ? "Parent name" : "Teacher name"}
                name={formData.role === "parent" ? "parentName" : "teacherName"}
                value={formData.role === "parent" ? formData.parentName : formData.teacherName}
                onChange={updateFormData}
                required
            />

            <div className={styles.formRow}>
                <TextField select label="Contact by" name="contactType" value={formData.contactType} onChange={updateFormData}>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label={formData.contactType === "email" ? "Email" : "Phone number"}
                    name="contactValue"
                    type={formData.contactType === "email" ? "email" : "tel"}
                    value={formData.contactValue}
                    onChange={updateFormData}
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
                <TextField select label="Gender" name="gender" value={formData.gender} onChange={updateFormData} required>
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

            <Button fullWidth type="submit" variant="contained" size="large">Continue</Button>
        </form>
    );
}

export default RegisterForm;
