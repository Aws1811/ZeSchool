import { useState } from "react";
import { Button, Typography } from "@mui/material";
import ChildCard from "./ChildCard";
import styles from "../App.module.css";

function ChildSetupForm({ onSubmit }) {
    const [children, setChildren] = useState([{ name: "Child 1", usesBus: "no" }]);

    const addChild = () => {
        setChildren((currentChildren) => [
            ...currentChildren,
            { name: `Child ${currentChildren.length + 1}`, usesBus: "no" },
        ]);
    };

    const removeChild = (index) => {
        setChildren((currentChildren) => {
            if (currentChildren.length === 1) {
                return currentChildren;
            }
            return currentChildren.filter((_, childIndex) => childIndex !== index);
        });
    };

    const updateChildName = (index, value) => {
        setChildren((currentChildren) =>
            currentChildren.map((child, childIndex) =>
                childIndex === index ? { ...child, name: value } : child,
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
                        childName={child.name}
                        usesBus={child.usesBus}
                        onNameChange={(value) => updateChildName(index, value)}
                        onBusChange={(value) => updateChildBusChoice(index, value)}
                        onRemove={() => removeChild(index)}
                        removeDisabled={children.length === 1}
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
