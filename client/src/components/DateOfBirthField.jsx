import { TextField } from "@mui/material";
import styles from "../styles/app.module.css";

function DateOfBirthField({ value, onChange }) {
    return (
        <TextField
            fullWidth
            className={styles.dateOfBirthField}
            name="dateOfBirth"
            aria-label="Date of birth"
            type="date"
            value={value}
            onChange={onChange}
            inputProps={{ max: new Date().toISOString().split("T")[0] }}
            required
        />
    );
}

export default DateOfBirthField;
