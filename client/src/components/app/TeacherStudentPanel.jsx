import { teacherStudents } from "../../data/mockData";
import styles from "../../styles/app.module.css";

function TeacherStudentPanel({ activeId = 1 }) {
    return (
        <aside className={styles.studentPanel}>
            <div className={styles.studentPanelHeader}>
                <div>
                    <span>Class</span>
                    <strong>Grade 7-B</strong>
                </div>
                <button type="button">+</button>
            </div>
            <div className={styles.studentSearch}>Search students</div>
            <div className={styles.studentList}>
                {teacherStudents.map((student) => (
                    <button
                        key={student.id}
                        type="button"
                        className={`${styles.studentItem} ${student.id === activeId ? styles.studentItemActive : ""}`}
                    >
                        <span className={styles.avatar}>{student.initials}</span>
                        <span className={styles.studentMeta}>
                            <strong>{student.name}</strong>
                            <small>{student.parent}</small>
                        </span>
                        {student.unread > 0 && <span className={styles.badge}>{student.unread}</span>}
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default TeacherStudentPanel;
