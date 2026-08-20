import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../styles/app.module.css";

function LandingPage() {
    return (
        <main className={styles.landingPage}>
            <section className={styles.landingContent}>
                <div className={styles.brandMark}>ZS</div>
                <Typography className={styles.eyebrow}>ZeSchool</Typography>
                <Typography component="h1" className={styles.landingTitle}>
                    Connecting parents and teachers in one place.
                </Typography>
                <Typography className={styles.landingDescription}>
                    Placeholder text for the ZeSchool landing area. Stay informed
                    about communication, academic progress, and important school
                    information.
                </Typography>
                <div className={styles.landingActions}>
                    <Button component={Link} to="/login" variant="contained" size="large">
                        Login
                    </Button>
                    <Button component={Link} to="/register" variant="outlined" size="large">
                        Register
                    </Button>
                </div>
            </section>
        </main>
    );
}

export default LandingPage;
