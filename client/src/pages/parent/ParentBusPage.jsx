import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import styles from "../../styles/app.module.css";

function ParentBusPage() {
    return (
        <AppShell role="parent" title="Bus" topAction={<ChildSelector />}>
            <section className={styles.busGrid}>
                <div className={`${styles.card} ${styles.mapCard}`}>
                    <div className={styles.mapRoadA} />
                    <div className={styles.mapRoadB} />
                    <div className={styles.mapRoadC} />
                    <span className={styles.schoolPin}>School</span>
                    <span className={styles.busPin}>Bus 12</span>
                    <div className={styles.mapLabel}>Map preview</div>
                </div>
                <aside className={`${styles.card} ${styles.busInfo}`}>
                    <span className={styles.livePill}>Live preview</span>
                    <h2>Bus 12</h2>
                    <p>Transportation is currently shown as a design preview. Live GPS can be connected later.</p>
                    <div><span>Driver</span><strong>Ahmad Saleh</strong></div>
                    <div><span>Route</span><strong>Ramallah North</strong></div>
                    <div><span>Estimated arrival</span><strong>3:42 PM</strong></div>
                </aside>
            </section>
        </AppShell>
    );
}

export default ParentBusPage;
