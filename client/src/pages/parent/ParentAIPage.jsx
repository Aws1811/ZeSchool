import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import styles from "../../styles/app.module.css";

function ParentAIPage() {
    return (
        <AppShell role="parent" title="AI Insight" topAction={<ChildSelector />}>
            <section className={styles.aiGrid}>
                <article className={`${styles.card} ${styles.aiHero}`}>
                    <span className={styles.pill}>Weekly summary</span>
                    <h2>Adam is showing steady progress this week.</h2>
                    <p>
                        Grades remain strong, attendance is mostly consistent, and teacher reports
                        show good classroom participation. Mathematics is the strongest recent area.
                    </p>
                </article>
                <div className={`${styles.card} ${styles.aiCard}`}>
                    <span>Positive signal</span>
                    <strong>Mathematics</strong>
                    <p>Recent grade: 92%. Teacher feedback also mentions strong participation.</p>
                </div>
                <div className={`${styles.card} ${styles.aiCard}`}>
                    <span>Worth watching</span>
                    <strong>Attendance</strong>
                    <p>One late arrival and one absence appeared in the recent records.</p>
                </div>
                <div className={`${styles.card} ${styles.aiCard}`}>
                    <span>Simple next step</span>
                    <strong>Review fractions</strong>
                    <p>A short review before Thursday matches the teacher's latest recommendation.</p>
                </div>
            </section>
        </AppShell>
    );
}

export default ParentAIPage;
