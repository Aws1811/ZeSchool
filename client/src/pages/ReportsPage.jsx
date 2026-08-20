import { useState } from "react";
import { reportData } from "../data/reportsWatchData";
import styles from "../styles/reports.module.css";

function ReportsPage() {
    const [selectedReportId, setSelectedReportId] = useState(reportData[0]?.id || null);
    const selectedReport = reportData.find((report) => report.id === selectedReportId) || reportData[0];

    return (
        <section className={styles.reportsPage} aria-label="Parent reports">
            <div className={styles.reportsWorkspace}>
                <aside className={styles.reportListPanel} aria-label="Reports list">
                    <div className={styles.listHeading}>
                        <span className={styles.eyebrow}>SCHOOL RECORDS</span>
                        <strong>Reports</strong>
                        <span>Select a report to view the full document.</span>
                    </div>

                    <div className={styles.reportList}>
                        {reportData.map((report) => {
                            const isSelected = selectedReportId === report.id;
                            return (
                                <button
                                    type="button"
                                    className={`${styles.reportButton} ${isSelected ? styles.selectedReport : ""}`}
                                    key={report.id}
                                    onClick={() => setSelectedReportId(report.id)}
                                    aria-pressed={isSelected}
                                >
                                    <span className={styles.reportType}>{report.type}</span>
                                    <span className={styles.reportContent}>
                                        <strong>{report.title}</strong>
                                        <span>{report.summary}</span>
                                    </span>
                                    <span className={styles.reportMeta}>
                                        <small>{report.date}</small>
                                        <span>{isSelected ? "Viewing" : "View report"} <b>›</b></span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {selectedReport && (
                    <article className={styles.reportDocument} aria-label={`${selectedReport.title} details`}>
                        <header className={styles.documentHeader}>
                            <div>
                                <span className={styles.eyebrow}>ZESCHOOL REPORT</span>
                                <h1>{selectedReport.title}</h1>
                                <p>{selectedReport.date} · Prepared by {selectedReport.author}</p>
                            </div>
                            <span className={styles.documentMark}>ZS</span>
                        </header>

                        <div className={styles.documentBody}>
                            <div className={styles.documentIntro}>
                                <span className={styles.documentIcon}>◆</span>
                                <div>
                                    <strong>Student progress document</strong>
                                    <p>This report summarizes the selected child&apos;s progress during the current school period.</p>
                                </div>
                            </div>

                            <section className={styles.documentSection}>
                                <h2>Report overview</h2>
                                <div className={styles.overviewGrid}>
                                    <div><span>Report type</span><strong>{selectedReport.type}</strong></div>
                                    <div><span>Teacher</span><strong>{selectedReport.author}</strong></div>
                                    <div><span>Report date</span><strong>{selectedReport.date}</strong></div>
                                </div>
                            </section>

                            <section className={styles.documentSection}>
                                <h2>Observation</h2>
                                <p className={styles.documentText}>{selectedReport.detail}</p>
                            </section>

                            <section className={styles.documentSection}>
                                <h2>Summary</h2>
                                <p className={styles.documentText}>{selectedReport.summary}</p>
                            </section>

                            <section className={styles.documentSection}>
                                <h2>Next steps</h2>
                                <ul className={styles.documentList}>
                                    <li>Continue reviewing progress with the child at home.</li>
                                    <li>Keep communication open with the school team.</li>
                                    <li>Use future reports to compare progress over time.</li>
                                </ul>
                            </section>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}

export default ReportsPage;
