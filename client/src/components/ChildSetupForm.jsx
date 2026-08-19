import { useState } from "react";
import { Button, Typography } from "@mui/material";
import ChildCard from "./ChildCard";
import styles from "../styles/childSetup.module.css";

function ChildSetupForm({ onSubmit }) {
    const [children, setChildren] = useState([{ name: "Child 1", usesBus: "no" }]);

    const addChild = () => setChildren((current) => [
        ...current,
        { name: `Child ${current.length + 1}`, usesBus: "no" },
    ]);

    const removeChild = (index) => {
        setChildren((current) => current.length === 1 ? current : current.filter((_, i) => i !== index));
    };

    const updateChild = (index, field, value) => {
        setChildren((current) => current.map((child, i) => i === index ? { ...child, [field]: value } : child));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(children);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <Typography>Children added: {children.length}</Typography>
                <Button type="button" variant="outlined" onClick={addChild}>Add child</Button>
            </div>
            <div className={styles.childrenList}>
                {children.map((child, index) => (
                    <ChildCard
                        key={index}
                        childName={child.name}
                        usesBus={child.usesBus}
                        onNameChange={(value) => updateChild(index, "name", value)}
                        onBusChange={(value) => updateChild(index, "usesBus", value)}
                        onRemove={() => removeChild(index)}
                        removeDisabled={children.length === 1}
                    />
                ))}
            </div>
            <Button fullWidth type="submit" variant="contained" size="large">Create account</Button>
        </form>
    );
}

export default ChildSetupForm;
