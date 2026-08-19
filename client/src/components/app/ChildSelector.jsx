import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { children } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function ChildSelector() {
    const [childId, setChildId] = useState(children[0].id);

    return (
        <Select
            size="small"
            value={childId}
            onChange={(event) => setChildId(event.target.value)}
            className={styles.selector}
        >
            {children.map((child) => (
                <MenuItem key={child.id} value={child.id}>
                    {child.name} · {child.className}
                </MenuItem>
            ))}
        </Select>
    );
}

export default ChildSelector;
