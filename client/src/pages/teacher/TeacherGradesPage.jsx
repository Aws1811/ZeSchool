import { useState } from "react";
import { Button, TextField } from "@mui/material";
import AppShell from "../../components/app/AppShell";
import TeacherStudentPanel from "../../components/app/TeacherStudentPanel";
import { grades } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function TeacherGradesPage() {
    const [message, setMessage] = useState("");

    return (
        <AppShell role="teacher" title="Grades">
            <div className={styles.teacherSplit}>
                <TeacherStudentPanel />
                <section className={`${styles.card} ${styles.teacherEditor}`}>
                    <div className={styles.sectionHeader}>
                        <div><h2>Adam Shaheen</h2><p>Grade 7-B · Update subject grades</p></div>
                    </div>
                    <div className={styles.gradeEditorList}>
                        {grades.map((item) => (
                            <div key={item.subject} className={styles.gradeEditorRow}>
                                <div><strong>{item.subject}</strong><span>{item.teacher}</span></div>
                                <TextField size="small" type="number" defaultValue={item.grade} inputProps={{ min: 0, max: 100 }} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.editorFooter}>
                        <span>{message}</span>
                        <Button variant="contained" onClick={() => setMessage("Grades saved in frontend preview.")}>Save grades</Button>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}

export default TeacherGradesPage;
