import { useState } from "react";
import { Button, Typography } from "@mui/material";
import ChildCard from "../ChildCard/ChildCard";
import styles from "../../App.module.css";

function ChildSetupForm({ onSubmit }) {
    const [children, setChildren] = useState([{ usesBus: "no" }]);

    const addChild = () => {
        setChildren((currentChildren) => [
            ...currentChildren,
            { usesBus: "no" },
        ]);
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
            <div className={styles.childSetupHeader}>
                <Typography className={styles.childSetupLabel}>
                    Children added: {children.length}
                </Typography>
                <Button type="button" variant="outlined" onClick={addChild}>
                    Add child
                </Button>
            </div>
            <div className={styles.childrenList}>
                {children.map((child, index) => (
                    <ChildCard
                        key={index}
                        childNumber={index + 1}
                        usesBus={child.usesBus}
                        onBusChange={(value) => updateChildBusChoice(index, value)}
                    />
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
