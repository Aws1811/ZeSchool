import { useState } from "react";
import { teacherAttendance, teacherGradeEntries, teacherReports } from "../data/teacherData";
import styles from "../styles/teacher-ai-analysis.module.css";

const dataSources = ["Grades", "Attendance", "Reports", "Calendar"];

function TeacherAIAnalysisPage({ selectedClass, selectedStudent }) {
    const [mode, setMode] = useState("student");
    const [selectedSources, setSelectedSources] = useState(dataSources);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const students = selectedClass.students;
    const classReports = teacherReports.filter((report) => students.some((student) => student.id === report.studentId));
    const classGrades = teacherGradeEntries.filter((grade) => students.some((student) => student.id === grade.studentId));
    const classAttendance = teacherAttendance.filter((entry) => students.some((student) => student.id === entry.studentId));
    const currentStudent = students.find((student) => student.id === selectedStudent.id) || students[0];
    const studentReports = classReports.filter((report) => report.studentId === currentStudent.id);
    const studentGrades = classGrades.filter((grade) => grade.studentId === currentStudent.id);
    const studentAttendance = classAttendance.filter((entry) => entry.studentId === currentStudent.id);
    const focusName = mode === "student" ? currentStudent.name : selectedClass.name;
    const reportCount = mode === "student" ? studentReports.length : classReports.length;
    const gradeCount = mode === "student" ? studentGrades.length : classGrades.length;
    const attendanceCount = mode === "student" ? studentAttendance.length : classAttendance.length;
    const reviewCount = mode === "student" ? (currentStudent.status === "Needs review" ? 1 : 0) : students.filter((student) => student.status === "Needs review").length;

    const summary = mode === "student"
        ? `${currentStudent.name} is currently ${currentStudent.status.toLowerCase()}. The available records show ${gradeCount} grade record, ${attendanceCount} attendance record, and ${reportCount} teacher report.`
        : `${selectedClass.name} has ${students.length} students. The available records show ${classGrades.length} grade entries, ${classAttendance.length} attendance entries, and ${classReports.length} teacher reports.`;

    const recommendation = mode === "student"
        ? currentStudent.status === "Needs review"
            ? "Review the latest subject work and schedule a short parent follow-up before the next assessment."
            : "Continue the current support routine and record the next assessment to monitor progress."
        : reviewCount
            ? `Prioritize a short support plan for the ${reviewCount} student${reviewCount === 1 ? "" : "s"} needing review.`
            : "The class is progressing steadily. Keep the current lesson rhythm and continue recording assessments.";

    const toggleSource = (source) => {
        setSelectedSources((current) => current.includes(source) ? current.filter((item) => item !== source) : [...current, source]);
        setHasAnalyzed(false);
    };

    const runAnalysis = () => {
        setHasAnalyzed(true);
        setAnswer("");
    };

    const handleQuestionSubmit = (event) => {
        event.preventDefault();
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion) return;
        setAnswer(recommendation);
        setQuestion("");
    };

    return (
        <section className={styles.aiPage} aria-label="AI analysis">
            <div className={styles.workspace}>
                <aside className={styles.controlPanel}>
                    <span className={styles.eyebrow}>AI ANALYSIS</span>
                    <h1>Ask about school progress</h1>
                    <p className={styles.controlIntro}>Choose what you want to understand, select the available data, and let AI prepare a focused answer.</p>

                    <div className={styles.contextLine}><span>Working with</span><strong>{selectedClass.name}</strong></div>

                    <div className={styles.controlSection}>
                        <span className={styles.controlLabel}>Analysis mode</span>
                        <div className={styles.modeSwitch}><button type="button" className={mode === "student" ? styles.activeMode : ""} onClick={() => { setMode("student"); setHasAnalyzed(false); }}>Student analysis</button><button type="button" className={mode === "class" ? styles.activeMode : ""} onClick={() => { setMode("class"); setHasAnalyzed(false); }}>Class analysis</button></div>
                    </div>

                    {mode === "student" && <label className={styles.studentSelect}>Student<select value={currentStudent.id} onChange={() => setHasAnalyzed(false)}>{students.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)}</select></label>}

                    <div className={styles.controlSection}><span className={styles.controlLabel}>Data to consider</span><div className={styles.sourceList}>{dataSources.map((source) => <button type="button" className={selectedSources.includes(source) ? styles.activeSource : ""} onClick={() => toggleSource(source)} key={source}>{source}</button>)}</div></div>

                    <button type="button" className={styles.analyzeButton} onClick={runAnalysis}>Run AI analysis</button>
                    <div className={styles.controlNote}>AI uses only the selected school data for this view.</div>
                </aside>

                <main className={styles.answerPanel}>
                    <div className={styles.answerHeader}><div><span className={styles.eyebrow}>AI RESPONSE</span><h2>{focusName}</h2><p>{selectedSources.length ? `Using ${selectedSources.join(", ")}` : "No data sources selected"}</p></div><span className={styles.status}>{hasAnalyzed ? "Ready" : "Waiting"}</span></div>
                    <div className={styles.answerContent}>
                        <span className={styles.answerLabel}>What the data says</span>
                        <p>{hasAnalyzed ? summary : "Your analysis will appear here after you choose the options and run AI analysis."}</p>
                    </div>
                    <div className={styles.answerDetails}>{hasAnalyzed && <><div><span>Grade records</span><strong>{gradeCount}</strong></div><div><span>Attendance records</span><strong>{attendanceCount}</strong></div><div><span>Teacher reports</span><strong>{reportCount}</strong></div><div><span>Needs review</span><strong>{reviewCount}</strong></div></>}</div>
                    <div className={styles.recommendation}><span>AI recommendation</span><p>{hasAnalyzed ? recommendation : "A practical next step will appear here after the analysis is prepared."}</p></div>
                    <form className={styles.questionForm} onSubmit={handleQuestionSubmit}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={`Ask a follow-up about ${focusName}...`} aria-label="Ask a follow-up question" /><button type="submit">Ask AI</button></form>
                    {answer && <div className={styles.followUp}><span>Your follow-up answer</span><p>{answer}</p></div>}
                </main>
            </div>
        </section>
    );
}

export default TeacherAIAnalysisPage;
