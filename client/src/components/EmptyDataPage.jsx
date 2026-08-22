import styles from "../styles/dashboard-shell.module.css";

function EmptyDataPage({ title, description }) {
    return (
        <section className={styles.emptyChat} aria-label={title}>
            <div className={styles.emptyChatTitle}>{title}</div>
            <div className={styles.emptyChatText}>{description}</div>
        </section>
    );
}

export default EmptyDataPage;
