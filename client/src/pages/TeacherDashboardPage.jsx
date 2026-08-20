import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    teacherAttendance,
    teacherCalendarEvents,
    teacherClasses,
    teacherConversations,
    teacherGradeEntries,
    teacherMessages,
    teacherProfile,
    teacherReports,
} from "../data/teacherData";
import styles from "../styles/teacher-dashboard.module.css";

const pageItems = ["Dashboard", "Classes", "Calendar", "Messages", "Reports", "AI Analysis"];
const attendanceOptions = ["Present", "Absent", "Late", "Excused"];
const calendarTypes = ["Assignment", "Exam", "Event"];

function getInitials(name) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function TeacherDashboardPage() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState("Dashboard");
    const [selectedClassId, setSelectedClassId] = useState(teacherClasses[0].id);
    const [selectedStudentId, setSelectedStudentId] = useState(teacherClasses[0].students[0].id);
    const [studentSearch, setStudentSearch] = useState("");
    const [parentSearch, setParentSearch] = useState("");
    const [selectedConversationId, setSelectedConversationId] = useState(teacherConversations[0].id);
    const [messageText, setMessageText] = useState("");
    const [selectedAnalysisScope, setSelectedAnalysisScope] = useState("student");
    const [gradeForm, setGradeForm] = useState({ subject: "Mathematics", assessment: "Quiz 1", score: "", date: "August 20, 2026" });
    const [attendanceForm, setAttendanceForm] = useState("Present");
    const [calendarForm, setCalendarForm] = useState({ type: "Assignment", title: "", description: "", date: "", target: "class" });
    const [reportForm, setReportForm] = useState({ type: "Academic progress", period: "August 2026", content: "" });
    const [notice, setNotice] = useState("");

    const selectedClass = teacherClasses.find((item) => item.id === selectedClassId) || teacherClasses[0];
    const allAssignedStudents = useMemo(() => teacherClasses.flatMap((item) => item.students), []);
    const selectedStudent = allAssignedStudents.find((student) => student.id === selectedStudentId) || selectedClass.students[0];
    const selectedConversation = teacherConversations.find((conversation) => conversation.id === selectedConversationId) || teacherConversations[0];
    const currentMessages = teacherMessages[selectedConversation.id] || [{ id: "empty-message", sender: "teacher", text: "Start a new conversation with this parent.", time: "Now" }];
    const filteredStudents = allAssignedStudents.filter((student) => student.name.toLowerCase().includes(studentSearch.toLowerCase()) || student.parent.toLowerCase().includes(studentSearch.toLowerCase()));
    const filteredConversations = teacherConversations.filter((conversation) => conversation.parent.toLowerCase().includes(parentSearch.toLowerCase()));

    const chooseStudent = (student) => {
        setSelectedStudentId(student.id);
        const belongingClass = teacherClasses.find((item) => item.students.some((entry) => entry.id === student.id));
        if (belongingClass) setSelectedClassId(belongingClass.id);
    };

    const showNotice = (text) => {
        setNotice(text);
        window.setTimeout(() => setNotice(""), 2400);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (!messageText.trim()) return;
        setMessageText("");
        showNotice("Message ready to send in the connected parent conversation.");
    };

    const handleSaveGrade = (event) => {
        event.preventDefault();
        showNotice(`Grade saved for ${selectedStudent.name}.`);
    };

    const handleSaveAttendance = (event) => {
        event.preventDefault();
        showNotice(`Attendance saved as ${attendanceForm} for ${selectedStudent.name}.`);
    };

    const handleCreateCalendarEvent = (event) => {
        event.preventDefault();
        showNotice(`${calendarForm.type} created for ${calendarForm.target === "class" ? selectedClass.name : selectedStudent.name}.`);
    };

    const handlePublishReport = (event) => {
        event.preventDefault();
        showNotice(`Report published for ${selectedStudent.name}.`);
    };

    const renderDashboard = () => (
        <div className={styles.pageContent}>
            <div className={styles.pageIntro}>
                <span className={styles.eyebrow}>TEACHER WORKSPACE</span>
                <h1>Welcome back, {teacherProfile.name}</h1>
                <p>Manage your assigned classes, student updates, and parent communication.</p>
            </div>
            <div className={styles.statGrid}>
                <div className={styles.statCard}><span>CLASSES</span><strong>{teacherClasses.length}</strong><small>Assigned to you</small></div>
                <div className={styles.statCard}><span>STUDENTS</span><strong>{allAssignedStudents.length}</strong><small>Across your classes</small></div>
                <div className={styles.statCard}><span>REVIEW</span><strong>3</strong><small>Assignments waiting</small></div>
                <div className={styles.statCard}><span>MESSAGES</span><strong>4</strong><small>Unread parent messages</small></div>
            </div>
            <section className={styles.sectionBlock}>
                <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>YOUR CLASSES</span><h2>Class overview</h2></div><button className={styles.secondaryButton} onClick={() => setSelectedPage("Classes")}>Open student list</button></div>
                <div className={styles.classGrid}>
                    {teacherClasses.map((item) => <button key={item.id} className={styles.classCard} onClick={() => { setSelectedClassId(item.id); setSelectedPage("Classes"); }}><span>{getInitials(item.name)}</span><strong>{item.name}</strong><small>{item.students.length} students · {item.academicYear}</small></button>)}
                </div>
            </section>
        </div>
    );

    const renderClasses = () => (
        <div className={styles.pageContent}>
            <div className={styles.pageIntro}><span className={styles.eyebrow}>CLASS AND STUDENT LIST</span><h1>Choose a student</h1><p>Search all students assigned to your classes or browse by class.</p></div>
            <div className={styles.contextBar}><label>Active class<select value={selectedClassId} onChange={(event) => setSelectedClassId(event.target.value)}>{teacherClasses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className={styles.growField}>Search assigned students<input value={studentSearch} onChange={(event) => setStudentSearch(event.target.value)} placeholder="Search by student or parent" /></label></div>
            <div className={styles.studentList}>{filteredStudents.map((student) => <button key={student.id} className={`${styles.studentRow} ${student.id === selectedStudentId ? styles.selectedRow : ""}`} onClick={() => chooseStudent(student)}><span className={styles.avatar}>{getInitials(student.name)}</span><span><strong>{student.name}</strong><small>{student.parent} · {student.subject}</small></span><em>{student.status}</em><b>›</b></button>)}</div>
        </div>
    );

    const renderChat = () => (
        <div className={styles.pageContent}>
            <div className={styles.pageIntro}><span className={styles.eyebrow}>PARENT COMMUNICATION</span><h1>Messages</h1><p>Conversations are connected to the assigned student.</p></div>
            <div className={styles.chatWorkspace}>
                <aside className={styles.conversationPanel}><input value={parentSearch} onChange={(event) => setParentSearch(event.target.value)} placeholder="Search parents" />{filteredConversations.map((conversation) => <button key={conversation.id} className={`${styles.conversationRow} ${conversation.id === selectedConversation.id ? styles.selectedRow : ""}`} onClick={() => setSelectedConversationId(conversation.id)}><span className={`${styles.presence} ${styles[conversation.status]}`} /><span className={styles.avatar}>{getInitials(conversation.parent)}</span><span><strong>{conversation.parent}</strong><small>{conversation.student}</small><em>{conversation.lastMessage}</em></span><time>{conversation.time}</time></button>)}</aside>
                <section className={styles.messagePanel}><header><div><span className={styles.avatar}>{getInitials(selectedConversation.parent)}</span><span><strong>{selectedConversation.parent}</strong><small>Parent of {selectedConversation.student}</small></span></div><span className={styles.statusText}>{selectedConversation.status}</span></header><div className={styles.messageList}>{currentMessages.map((message) => <div key={message.id} className={`${styles.messageBubble} ${message.sender === "teacher" ? styles.sentMessage : ""}`}><p>{message.text}</p><time>{message.time}</time></div>)}</div><form className={styles.messageForm} onSubmit={handleSendMessage}><input value={messageText} onChange={(event) => setMessageText(event.target.value)} placeholder="Write a message to the parent" /><button className={styles.primaryButton}>Send</button></form></section>
            </div>
        </div>
    );

    const renderCalendar = () => (
        <div className={styles.pageContent}>
            <div className={styles.pageIntro}><span className={styles.eyebrow}>CLASS CALENDAR</span><h1>Assignments and events</h1><p>Create items for a whole class or for one assigned student.</p></div>
            <div className={styles.formWorkspace}><form className={styles.formPanel} onSubmit={handleCreateCalendarEvent}><div className={styles.segmentedControl}>{calendarTypes.map((type) => <button type="button" key={type} className={calendarForm.type === type ? styles.activeSegment : ""} onClick={() => setCalendarForm({ ...calendarForm, type })}>{type}</button>)}</div><label>Title<input required value={calendarForm.title} onChange={(event) => setCalendarForm({ ...calendarForm, title: event.target.value })} placeholder="Math Homework - Chapter 3" /></label><label>Description<textarea value={calendarForm.description} onChange={(event) => setCalendarForm({ ...calendarForm, description: event.target.value })} placeholder="Add instructions or event details" /></label><div className={styles.formGrid}><label>Date<input required type="date" value={calendarForm.date} onChange={(event) => setCalendarForm({ ...calendarForm, date: event.target.value })} /></label><label>Target<select value={calendarForm.target} onChange={(event) => setCalendarForm({ ...calendarForm, target: event.target.value })}><option value="class">Whole class · {selectedClass.name}</option><option value="student">One student · {selectedStudent.name}</option></select></label></div><button className={styles.primaryButton}>Create {calendarForm.type.toLowerCase()}</button></form><aside className={styles.previewPanel}><span className={styles.eyebrow}>PARENT PREVIEW</span><h2>{calendarForm.title || "New calendar item"}</h2><p>{calendarForm.description || "The item will appear in the selected class or student calendar."}</p><div className={styles.previewLine}><span>{calendarForm.type}</span><strong>{calendarForm.target === "class" ? selectedClass.name : selectedStudent.name}</strong></div><div className={styles.eventList}>{teacherCalendarEvents.map((item) => <div key={item.id}><span>{item.type}</span><strong>{item.title}</strong><small>{item.date}</small></div>)}</div></aside></div>
        </div>
    );

    const renderGrades = () => (
        <div className={styles.pageContent}>
            <div className={styles.pageIntro}><span className={styles.eyebrow}>ACADEMIC UPDATE</span><h1>{selectedStudent.name}</h1><p>{selectedClass.name} · Enter grades and teacher-only attendance.</p></div>
            <div className={styles.formWorkspace}><div className={styles.formPanel}><form onSubmit={handleSaveGrade}><h2>Save grade</h2><div className={styles.formGrid}><label>Subject<input value={gradeForm.subject} onChange={(event) => setGradeForm({ ...gradeForm, subject: event.target.value })} /></label><label>Assessment<input value={gradeForm.assessment} onChange={(event) => setGradeForm({ ...gradeForm, assessment: event.target.value })} /></label><label>Score<input required value={gradeForm.score} onChange={(event) => setGradeForm({ ...gradeForm, score: event.target.value })} placeholder="18 / 20" /></label><label>Date<input value={gradeForm.date} onChange={(event) => setGradeForm({ ...gradeForm, date: event.target.value })} /></label></div><button className={styles.primaryButton}>Save grade</button></form><form className={styles.attendanceForm} onSubmit={handleSaveAttendance}><h2>Today's attendance</h2><div className={styles.attendanceOptions}>{attendanceOptions.map((status) => <label key={status}><input type="radio" name="attendance" checked={attendanceForm === status} onChange={() => setAttendanceForm(status)} />{status}</label>)}</div><button className={styles.secondaryButton}>Save attendance</button></form></div><aside className={styles.dataPanel}><h2>Recent grades</h2>{teacherGradeEntries.map((entry) => <div className={styles.dataRow} key={entry.id}><span>{entry.subject}</span><strong>{entry.score}</strong><small>{entry.assessment} · {entry.student}</small></div>)}<h2>Attendance log</h2>{teacherAttendance.map((entry) => <div className={styles.dataRow} key={entry.id}><span>{entry.student}</span><strong>{entry.status}</strong><small>{entry.date}</small></div>)}</aside></div>
        </div>
    );

    const renderReports = () => (
        <div className={styles.pageContent}><div className={styles.pageIntro}><span className={styles.eyebrow}>STUDENT REPORTS</span><h1>Write a report</h1><p>Publish a report that the selected student&apos;s parent can read.</p></div><div className={styles.formWorkspace}><form className={styles.formPanel} onSubmit={handlePublishReport}><div className={styles.formGrid}><label>Student<input readOnly value={`${selectedStudent.name} · ${selectedClass.name}`} /></label><label>Report type<select value={reportForm.type} onChange={(event) => setReportForm({ ...reportForm, type: event.target.value })}><option>Academic progress</option><option>Behavior / participation</option><option>Attendance</option></select></label><label>Academic period<input value={reportForm.period} onChange={(event) => setReportForm({ ...reportForm, period: event.target.value })} /></label></div><label>Report content<textarea required value={reportForm.content} onChange={(event) => setReportForm({ ...reportForm, content: event.target.value })} placeholder="Write the report that the parent will see" /></label><button className={styles.primaryButton}>Publish report</button></form><aside className={styles.previewPanel}><span className={styles.eyebrow}>PARENT PREVIEW</span><h2>{reportForm.type}</h2><strong>{reportForm.period}</strong><p>{reportForm.content || "Your report preview will appear here before publishing."}</p><div className={styles.divider} /><small>Published reports can be used as an authorized source for AI analysis.</small><h2>Recent reports</h2>{teacherReports.map((report) => <div className={styles.dataRow} key={report.id}><span>{report.student}</span><strong>{report.type}</strong><small>{report.period}</small></div>)}</aside></div></div>
    );

    const renderAI = () => {
        const scopeName = selectedAnalysisScope === "class" ? selectedClass.name : selectedStudent.name;
        return <div className={styles.pageContent}><div className={styles.pageIntro}><span className={styles.eyebrow}>AI PERFORMANCE ANALYSIS</span><h1>Analyze {scopeName}</h1><p>Teachers can review a whole class for themselves or one student before communicating with the parent.</p></div><div className={styles.aiWorkspace}><aside className={styles.aiControls}><h2>Analysis scope</h2><div className={styles.scopeButtons}><button className={selectedAnalysisScope === "student" ? styles.activeSegment : ""} onClick={() => setSelectedAnalysisScope("student")}>One student</button><button className={selectedAnalysisScope === "class" ? styles.activeSegment : ""} onClick={() => setSelectedAnalysisScope("class")}>Whole class</button></div><label>Question<textarea defaultValue={`Summarize the current performance of ${scopeName}.`} /></label><button className={styles.primaryButton} onClick={() => showNotice(`Analysis prepared for ${scopeName}.`)}>Analyze performance</button></aside><section className={styles.aiResult}><span className={styles.aiTag}>ANALYSIS PREVIEW</span><h2>{scopeName} performance summary</h2><p>{selectedAnalysisScope === "class" ? "The class is progressing steadily. Recent grades show strong participation with a small group that may benefit from additional review and targeted practice." : `${selectedStudent.name} is showing positive progress in Mathematics. Recent grades, attendance, and teacher reports indicate a good foundation for continued improvement.`}</p><div className={styles.sourceChips}><span>Grades</span><span>Attendance</span><span>Reports</span></div></section></div></div>;
    };

    const pageContent = selectedPage === "Dashboard" ? renderDashboard() : selectedPage === "Classes" ? renderClasses() : selectedPage === "Messages" ? renderChat() : selectedPage === "Calendar" ? renderCalendar() : selectedPage === "Reports" ? renderReports() : selectedPage === "AI Analysis" ? renderAI() : renderGrades();

    return <main className={styles.teacherDashboard}>
        <aside className={styles.sidebar}>
            <div className={styles.brand}><span>ZS</span><strong>ZeSchool</strong></div>
            <div className={styles.teacherIdentity}><span className={styles.avatar}>{getInitials(teacherProfile.name)}</span><div><strong>{teacherProfile.name}</strong><small>{teacherProfile.department}</small></div></div>
            <nav className={styles.navigation}>{pageItems.map((page) => <button key={page} className={selectedPage === page ? styles.activeNav : ""} onClick={() => setSelectedPage(page)}>{page}</button>)}</nav>
            <button className={styles.logoutButton} onClick={() => navigate("/")}>Log out</button>
        </aside>
        <section className={styles.teacherMain}>
            <header className={styles.topBar}><div className={styles.topContext}><span>Teacher</span><strong>{teacherProfile.name}</strong></div><div className={styles.selectionContext}><label>Active class<select value={selectedClassId} onChange={(event) => setSelectedClassId(event.target.value)}>{teacherClasses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><button className={styles.studentPill} onClick={() => setSelectedPage("Classes")}>{selectedStudent.name}</button></div></header>
            <div className={styles.pageViewport}>{pageContent}</div>
        </section>
        {notice && <div className={styles.notice}>{notice}</div>}
    </main>;
}

export default TeacherDashboardPage;
