import { useState } from "react";
import { Button } from "@mui/material";
import AppShell from "../../components/app/AppShell";
import TeacherStudentPanel from "../../components/app/TeacherStudentPanel";
import { teacherStudents } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function TeacherAttendancePage() {
    const [statuses, setStatuses] = useState(
        Object.fromEntries(teacherStudents.map((student) => [student.id, "Present"])),
    );

    const changeStatus = (id, status) => {
        setStatuses((current) => ({ ...current, [id]: status }));
    };

    return (
        <AppShell role="teacher" title="Attendance">
            <div className={styles.teacherSplit}>
                <TeacherStudentPanel />
                <section className={`${styles.card} ${styles.teacherEditor}`}>
                    <div className={styles.sectionHeader}>
                        <div><h2>Grade 7-B</h2><p>Wednesday, August 19, 2026</p></div>
                        <Button variant="contained">Save attendance</Button>
                    </div>
                    <div className={styles.attendanceEditorList}>
                        {teacherStudents.map((student) => (
                            <div className={styles.attendanceEditorRow} key={student.id}>
                                <span className={styles.avatar}>{student.initials}</span>
                                <div><strong>{student.name}</strong><small>{student.className}</small></div>
                                <div className={styles.statusButtons}>
                                    {["Present", "Late", "Absent"].map((status) => (
                                        <button
                                            type="button"
                                            key={status}
                                            onClick={() => changeStatus(student.id, status)}
                                            className={statuses[student.id] === status ? styles.statusButtonActive : ""}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}

export default TeacherAttendancePage;
