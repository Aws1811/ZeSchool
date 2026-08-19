import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import { attendanceRows } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function ParentAttendancePage() {
    return (
        <AppShell role="parent" title="Attendance" topAction={<ChildSelector />}>
            <section className={styles.statsGrid}>
                <div className={styles.statCard}><span>Attendance rate</span><strong>94%</strong><small>This term</small></div>
                <div className={styles.statCard}><span>Present days</span><strong>47</strong><small>Out of 50 school days</small></div>
                <div className={styles.statCard}><span>Absences</span><strong>2</strong><small>1 excused</small></div>
            </section>
            <section className={styles.card}>
                <div className={styles.sectionHeader}><div><h2>Recent attendance</h2><p>Latest attendance records from school.</p></div></div>
                <div className={styles.table}>
                    <div className={`${styles.tableRow} ${styles.tableHead}`}><span>Date</span><span>Status</span><span>Note</span></div>
                    {attendanceRows.map((row) => (
                        <div className={styles.tableRow} key={row.date}>
                            <span>{row.date}</span>
                            <span><b className={`${styles.statusTag} ${styles[`status_${row.status.toLowerCase()}`]}`}>{row.status}</b></span>
                            <span>{row.note}</span>
                        </div>
                    ))}
                </div>
            </section>
        </AppShell>
    );
}

export default ParentAttendancePage;
