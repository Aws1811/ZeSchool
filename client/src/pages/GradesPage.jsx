import { useState } from "react";
import { getGradeSheetForChild } from "../data/gradeData";
import styles from "../styles/grades.module.css";

function GradesPage({ child }) {
    const gradeSheet = getGradeSheetForChild(child);
    const [hoveredExamId, setHoveredExamId] = useState(null);
    const dateLabel = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <section className={styles.gradesPage} aria-label="Student grade sheet">
            <header className={styles.gradesHeader}>
                <h1>Student Grade Sheet</h1>
                <div className={styles.gradesDate}>{dateLabel}</div>
            </header>

            <div className={styles.studentSummary}>
                <div className={styles.studentName}>{child.name}</div>
                <div className={styles.studentClass}>{gradeSheet.className}</div>
            </div>

            <div className={styles.examSection}>
                <div className={styles.examSectionHeader}>
                    <h2>Exams</h2>
                    <span>Hover an exam to preview it</span>
                </div>
                <div className={styles.examTable} role="table" aria-label="Student exams">
                    <div className={`${styles.examRow} ${styles.examHeader}`} role="row">
                        <span role="columnheader">Exam</span>
                        <span role="columnheader">Subject</span>
                        <span role="columnheader">Date</span>
                        <span role="columnheader">Score</span>
                        <span role="columnheader">Grade</span>
                    </div>
                    {gradeSheet.exams.map((exam) => (
                        <div
                            className={`${styles.examRow} ${hoveredExamId === exam.id ? styles.hoveredExam : ""}`}
                            key={exam.id}
                            role="row"
                            onMouseEnter={() => setHoveredExamId(exam.id)}
                            onMouseLeave={() => setHoveredExamId(null)}
                            title={exam.details}
                        >
                            <div className={styles.examTitle} role="cell">
                                <strong>{exam.title}</strong>
                                <small>{exam.teacher}</small>
                            </div>
                            <span role="cell">{exam.subject}</span>
                            <span role="cell">{exam.date}</span>
                            <span role="cell">{exam.score}</span>
                            <strong role="cell">{exam.grade}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GradesPage;
