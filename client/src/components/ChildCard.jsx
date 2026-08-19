import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import styles from "../App.module.css";

function ChildCard({ childNumber, usesBus, onBusChange, onRemove }) {
    return (
        <div className={styles.childCard}>
            <div className={styles.childCardHeader}>
                <Typography className={styles.childTitle}>
                    Child {childNumber}
                </Typography>
                <Button
                    type="button"
                    color="error"
                    size="small"
                    onClick={onRemove}
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
