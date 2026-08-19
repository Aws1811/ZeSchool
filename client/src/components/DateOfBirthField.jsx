import { TextField } from "@mui/material";

function DateOfBirthField({ value, onChange }) {
    return (
        <TextField
            fullWidth
            label="Date of birth"
            name="dateOfBirth"
            type="date"
            value={value}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: new Date().toISOString().split("T")[0] }}
            required
        />
    );
}

export default DateOfBirthField;
