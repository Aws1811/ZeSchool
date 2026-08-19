import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import { reports } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function ParentReportsPage() {
    return (
        <AppShell role="parent" title="Reports" topAction={<ChildSelector />}>
            <section className={styles.reportGrid}>
                {reports.map((report) => (
                    <article className={`${styles.card} ${styles.reportCard}`} key={report.id}>
                        <div className={styles.reportTop}>
                            <span className={styles.pill}>{report.date}</span>
                            <span>{report.teacher}</span>
                        </div>
                        <h2>{report.title}</h2>
                        <p>{report.summary}</p>
                        <button type="button">Read report</button>
                    </article>
                ))}
            </section>
        </AppShell>
    );
}

export default ParentReportsPage;
