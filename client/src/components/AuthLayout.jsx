import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthSwitcher from "./AuthSwitcher";
import styles from "../App.module.css";

function AuthLayout({ title, description, children, activeView, message }) {
    return (
        <main className={styles.page}>
            <section className={styles.introduction}>
                <Link to="/" className={styles.brandLink}>
                    <div className={styles.brandMark}>ZS</div>
                </Link>
                <Typography className={styles.eyebrow}>ZeSchool</Typography>
                <Typography component="h1" className={styles.title}>
                    A clearer way to stay connected with school life.
                </Typography>
                <Typography className={styles.description}>
                    Keep parent and teacher communication, academic updates,
                    and important school information in one simple place.
                </Typography>
            </section>

            <Card className={styles.authCard} elevation={0}>
                <CardContent className={styles.cardContent}>
                    <AuthSwitcher activeView={activeView} />
                    <div>
                        <Typography component="h2" className={styles.formTitle}>
                            {title}
                        </Typography>
                        <Typography className={styles.formDescription}>
                            {description}
                        </Typography>
                    </div>
                    {children}
                    {message}
                </CardContent>
            </Card>
        </main>
    );
}

export default AuthLayout;
