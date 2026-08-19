import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/app.module.css";

const parentLinks = [
    ["Chat", "/parent/chat"],
    ["Calendar", "/parent/calendar"],
    ["Grades", "/parent/grades"],
    ["Attendance", "/parent/attendance"],
    ["Reports", "/parent/reports"],
    ["Bus", "/parent/bus"],
    ["AI Insight", "/parent/ai"],
];

const teacherLinks = [
    ["Chat", "/teacher/chat"],
    ["Calendar", "/teacher/calendar"],
    ["Grades", "/teacher/grades"],
    ["Attendance", "/teacher/attendance"],
    ["Reports", "/teacher/reports"],
];

function AppShell({ role, title, children, topAction, subNavigation }) {
    const links = role === "teacher" ? teacherLinks : parentLinks;
    const profileName = role === "teacher" ? "Ms. Noor Ahmad" : "Murad Shaheen";

    return (
        <div className={styles.shell}>
            <aside className={styles.sidebar}>
                <Link to="/" className={styles.brand}>ZeSchool</Link>
                <nav className={styles.nav}>
                    {links.map(([label, path]) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                            }
                        >
                            <span className={styles.navDot} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className={styles.profile}>
                    <span>{role === "teacher" ? "Teacher account" : "Parent account"}</span>
                    <strong>{profileName}</strong>
                    <Link to="/login">Sign out</Link>
                </div>
            </aside>

            <main className={styles.main}>
                <header className={styles.pageHeader}>
                    <div>
                        <p className={styles.pageEyebrow}>
                            {role === "teacher" ? "Teacher workspace" : "Parent workspace"}
                        </p>
                        <h1>{title}</h1>
                    </div>
                    {topAction}
                </header>
                {subNavigation}
                {children}
            </main>
        </div>
    );
}

export default AppShell;
