import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import styles from "../../App.module.css";

function ChildCard({ childNumber, usesBus, onBusChange }) {
    return (
        <div className={styles.childCard}>
            <Typography className={styles.childTitle}>
                Child {childNumber}
            </Typography>
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
