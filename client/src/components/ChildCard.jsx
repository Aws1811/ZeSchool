import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import styles from "../styles/app.module.css";

function ChildCard({ childName, usesBus, onNameChange, onBusChange, onRemove, removeDisabled }) {
    return (
        <div className={styles.childCard}>
            <div className={styles.childCardHeader}>
                <TextField
                    className={styles.childNameField}
                    variant="standard"
                    value={childName}
                    onChange={(event) => onNameChange(event.target.value)}
                    aria-label="Child name"
                    inputProps={{ maxLength: 40 }}
                />
                <Button
                    type="button"
                    color="error"
                    size="small"
                    onClick={onRemove}
                    disabled={removeDisabled}
                >
                    Remove
                </Button>
            </div>
            <FormControl>
                <FormLabel>Uses school bus?</FormLabel>
                <RadioGroup
                    row
                    value={usesBus}
                    onChange={(event) => onBusChange(event.target.value)}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default ChildCard;
