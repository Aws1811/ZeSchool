import { useState } from "react";
import { Button, TextField } from "@mui/material";
import AppShell from "../../components/app/AppShell";
import TeacherStudentPanel from "../../components/app/TeacherStudentPanel";
import { reports } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function TeacherReportsPage() {
    const [title, setTitle] = useState("");
    const [report, setReport] = useState("");
    const [saved, setSaved] = useState("");

    const save = (event) => {
        event.preventDefault();
        if (!title.trim() || !report.trim()) return;
        setSaved("Report saved in frontend preview.");
        setTitle("");
        setReport("");
    };

    return (
        <AppShell role="teacher" title="Reports">
            <div className={styles.teacherSplit}>
                <TeacherStudentPanel />
                <div className={styles.teacherReportColumn}>
                    <form className={`${styles.card} ${styles.reportForm}`} onSubmit={save}>
                        <div className={styles.sectionHeader}><div><h2>New report</h2><p>Adam Shaheen · Grade 7-B</p></div></div>
                        <TextField fullWidth label="Report title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <TextField fullWidth multiline minRows={5} label="Report details" value={report} onChange={(e) => setReport(e.target.value)} />
                        <div className={styles.editorFooter}><span>{saved}</span><Button type="submit" variant="contained">Save report</Button></div>
                    </form>
                    <section className={`${styles.card} ${styles.previousReports}`}>
                        <h3>Previous reports</h3>
                        {reports.map((item) => (
                            <div key={item.id}><strong>{item.title}</strong><span>{item.date}</span><p>{item.summary}</p></div>
                        ))}
                    </section>
                </div>
            </div>
        </AppShell>
    );
}

export default TeacherReportsPage;
