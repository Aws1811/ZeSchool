import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import { grades } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function ParentGradesPage() {
    const average = Math.round(grades.reduce((sum, item) => sum + item.grade, 0) / grades.length);

    return (
        <AppShell role="parent" title="Grades" topAction={<ChildSelector />}>
            <section className={styles.statsGrid}>
                <div className={styles.statCard}><span>Current average</span><strong>{average}%</strong><small>Across 5 subjects</small></div>
                <div className={styles.statCard}><span>Highest grade</span><strong>94%</strong><small>Arabic</small></div>
                <div className={styles.statCard}><span>Latest result</span><strong>92%</strong><small>Mathematics</small></div>
            </section>
            <section className={styles.card}>
                <div className={styles.sectionHeader}><div><h2>Subject results</h2><p>Latest recorded grades for Adam.</p></div></div>
                <div className={styles.gradeList}>
                    {grades.map((item) => (
                        <div className={styles.gradeRow} key={item.subject}>
                            <div><strong>{item.subject}</strong><span>{item.teacher}</span></div>
                            <div className={styles.progress}><span style={{ width: `${item.grade}%` }} /></div>
                            <strong className={styles.gradeValue}>{item.grade}%</strong>
                            <span className={styles.gradeStatus}>{item.status}</span>
                        </div>
                    ))}
                </div>
            </section>
        </AppShell>
    );
}

export default ParentGradesPage;
