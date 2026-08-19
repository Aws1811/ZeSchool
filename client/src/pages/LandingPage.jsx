import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../styles/landing.module.css";

function LandingPage() {
    return (
        <main className={styles.page}>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.brand}>ZeSchool</Link>
                <div>
                    <Button component={Link} to="/login">Login</Button>
                    <Button component={Link} to="/register" variant="contained">Create account</Button>
                </div>
            </nav>

            <section className={styles.hero}>
                <div className={styles.heroCopy}>
                    <span className={styles.eyebrow}>Parents and teachers, connected</span>
                    <h1>School communication that feels simple.</h1>
                    <p>
                        One calm place for messages, grades, attendance, reports,
                        calendar updates, transportation information, and useful AI insight.
                    </p>
                    <div className={styles.actions}>
                        <Button component={Link} to="/register" variant="contained" size="large">Get started</Button>
                        <Button component={Link} to="/login" variant="outlined" size="large">Login</Button>
                    </div>
                </div>

                <div className={styles.preview}>
                    <div className={styles.previewTop}>
                        <span>ZeSchool</span>
                        <span>Adam Shaheen · 7-B</span>
                    </div>
                    <div className={styles.previewBody}>
                        <div className={styles.previewSidebar}>
                            <strong>Chat</strong>
                            <span>Calendar</span>
                            <span>Grades</span>
                            <span>Attendance</span>
                            <span>Reports</span>
                        </div>
                        <div className={styles.previewChat}>
                            <small>Ms. Noor · Mathematics</small>
                            <div className={styles.previewMessage}>Adam participated very well in class today.</div>
                            <div className={`${styles.previewMessage} ${styles.previewMine}`}>Thank you for the update.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.featureStrip}>
                <div><strong>Communication</strong><span>Parent-teacher chat stays organized by child.</span></div>
                <div><strong>School progress</strong><span>Grades, attendance, reports, and calendar in one place.</span></div>
                <div><strong>Clear insight</strong><span>Simple AI summaries help parents understand progress.</span></div>
            </section>
        </main>
    );
}

export default LandingPage;
