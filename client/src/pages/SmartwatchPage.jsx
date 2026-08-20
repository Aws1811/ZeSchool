import { useMemo } from "react";
import { getSmartwatchDataForChild } from "../data/reportsWatchData";
import styles from "../styles/smartwatch.module.css";

function SmartwatchPage({ child }) {
    const watch = useMemo(() => getSmartwatchDataForChild(child), [child]);

    return (
        <section className={styles.watchPage} aria-label="Smartwatch purchases">
            {!watch.isConnected ? (
                <section className={styles.connectionNotice}>
                    <span className={styles.noticeLabel}>WATCH STATUS</span>
                    <h2>This child does not have a connected smartwatch.</h2>
                    <p>Watch activity will appear here after a device is connected.</p>
                </section>
            ) : (
                <>
                    <section className={styles.watchSummary}>
                        <div className={styles.watchFace}>Z</div>
                        <div className={styles.watchIdentity}>
                            <span className={styles.watchLabel}>LINKED WATCH</span>
                            <h2>{watch.deviceName}</h2>
                            <span className={styles.connectedStatus}>CONNECTED</span>
                        </div>
                        <div className={styles.balanceBlock}>
                            <span>Balance</span>
                            <strong>{watch.balance}</strong>
                        </div>
                        <button type="button" className={styles.topUpButton} title="Top up will be connected later">Top up</button>
                    </section>

                    <section className={styles.activityPanel}>
                        <div className={styles.activityHeading}>
                            <div>
                                <div className={styles.eyebrow}>PURCHASE ACTIVITY</div>
                                <h2>Recent purchases</h2>
                            </div>
                            <span>Last updated {watch.lastUpdated}</span>
                        </div>
                        <div className={styles.activityTable} role="table" aria-label="Smartwatch purchase activity">
                            <div className={styles.tableHeader} role="row">
                                <span>Activity</span><span>Amount</span><span>Time</span>
                            </div>
                            {watch.purchases.map((purchase) => (
                                <div className={styles.tableRow} role="row" key={purchase.id}>
                                    <div><strong>{purchase.activity}</strong><small>{purchase.date}</small></div>
                                    <span>{purchase.amount}</span>
                                    <span>{purchase.time}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </section>
    );
}

export default SmartwatchPage;
