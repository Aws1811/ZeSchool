import { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import styles from "../App.module.css";

function ChildSetupForm({ onSubmit }) {
    const [children, setChildren] = useState([{ usesBus: "no" }]);

    const changeChildrenCount = (event) => {
        const count = Number(event.target.value);
        setChildren((currentChildren) =>
            Array.from({ length: count }, (_, index) =>
                currentChildren[index] || { usesBus: "no" },
            ),
        );
    };

    const updateChildBusChoice = (index, value) => {
        setChildren((currentChildren) =>
            currentChildren.map((child, childIndex) =>
                childIndex === index ? { ...child, usesBus: value } : child,
            ),
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(children);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
                fullWidth
                select
                label="How many children do you want to add?"
                value={children.length}
                onChange={changeChildrenCount}
            >
                {[1, 2, 3, 4, 5].map((count) => (
                    <MenuItem key={count} value={count}>
                        {count}
                    </MenuItem>
                ))}
            </TextField>
            <div className={styles.childrenList}>
                {children.map((child, index) => (
                    <div className={styles.childCard} key={index}>
                        <Typography className={styles.childTitle}>
                            Child {index + 1}
                        </Typography>
                        <FormControl>
                            <FormLabel>Uses school bus?</FormLabel>
                            <RadioGroup
                                row
                                value={child.usesBus}
                                onChange={(event) => updateChildBusChoice(index, event.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                ))}
            </div>
            <Button fullWidth type="submit" variant="contained" size="large">
                Create account
            </Button>
            <Typography className={styles.futureNote}>
                Child names and school details can be designed later when the child records are finalized.
            </Typography>
        </form>
    );
}

export default ChildSetupForm;
