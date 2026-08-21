import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import TeacherAIAnalysisPage from "./TeacherAIAnalysisPage";
import { teacherClasses, teacherClassSchedule, teacherConversations, teacherMessages, teacherProfile, teacherReports } from "../data/teacherData";
import shellStyles from "../styles/dashboard-shell.module.css";
import chatStyles from "../styles/chat.module.css";
import styles from "../styles/teacher-pages.module.css";

const pageItems = ["Chat", "Classes", "Calendar", "Reports", "AI analysis"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const eventColors = ["red", "yellow", "blue", "green"];
const initialEvents = [
    { id: "teacher-event-1", date: "2026-08-04", title: "Math review", color: "blue", target: "Grade 5A" },
    { id: "teacher-event-2", date: "2026-08-12", title: "Parent meeting", color: "yellow", target: "Grade 5A" },
];

function getInitials(name) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function formatDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getCalendarDays(monthDate) {
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const firstCalendarDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1 - firstDay.getDay());
    return Array.from({ length: 42 }, (_, index) => new Date(firstCalendarDay.getFullYear(), firstCalendarDay.getMonth(), firstCalendarDay.getDate() + index));
}

function LogoutIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 5H6.8C5.806 5 5 5.806 5 6.8v10.4c0 .994.806 1.8 1.8 1.8H10M14 8l4 4-4 4M18 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function TeacherDashboardPage() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState("Chat");
    const [selectedClassId, setSelectedClassId] = useState(teacherClasses[0].id);
    const [selectedStudentId, setSelectedStudentId] = useState(teacherClasses[0].students[0].id);
    const [selectedConversationId, setSelectedConversationId] = useState(teacherConversations[0].id);
    const [parentSearch, setParentSearch] = useState("");
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState(teacherMessages);
    const [monthDate, setMonthDate] = useState(new Date(2026, 7, 1));
    const [selectedDate, setSelectedDate] = useState("2026-08-20");
    const [events, setEvents] = useState(initialEvents);
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [eventForm, setEventForm] = useState({ title: "", color: "blue", target: "class" });
    const [reportForm, setReportForm] = useState({ classId: teacherClasses[0].id, studentId: teacherClasses[0].students[0].id, date: "2026-08-21", type: "Academic progress", content: "" });
    const [reportHistory, setReportHistory] = useState(teacherReports);
    const [analysisScope, setAnalysisScope] = useState("student");
    const [notice, setNotice] = useState("");

    const selectedClass = teacherClasses.find((item) => item.id === selectedClassId) || teacherClasses[0];
    const allStudents = useMemo(() => teacherClasses.flatMap((item) => item.students), []);
    const selectedStudent = allStudents.find((item) => item.id === selectedStudentId) || selectedClass.students[0];
    const selectedConversation = teacherConversations.find((item) => item.id === selectedConversationId) || teacherConversations[0];
    const visibleParents = teacherConversations.filter((item) => item.parent.toLowerCase().includes(parentSearch.toLowerCase()));
    const visibleStudents = allStudents;
    const monthLabel = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const calendarDays = getCalendarDays(monthDate);

    const showNotice = (text) => {
        setNotice(text);
        window.setTimeout(() => setNotice(""), 2200);
    };

    const chooseStudent = (student) => {
        setSelectedStudentId(student.id);
        const studentClass = teacherClasses.find((item) => item.students.some((entry) => entry.id === student.id));
        if (studentClass) setSelectedClassId(studentClass.id);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        const text = messageText.trim();
        if (!text) return;
        setMessages((current) => ({ ...current, [selectedConversationId]: [...(current[selectedConversationId] || []), { id: Date.now(), sender: teacherProfile.name, mine: true, text, time: "Now" }] }));
        setMessageText("");
    };

    const handleAddEvent = (event) => {
        event.preventDefault();
        if (!eventForm.title.trim()) return;
        setEvents((current) => [...current, { id: Date.now(), date: selectedDate, title: eventForm.title.trim(), color: eventForm.color, target: eventForm.target === "class" ? selectedClass.name : selectedStudent.name }]);
        setEventForm({ title: "", color: "blue", target: "class" });
        setIsAddingEvent(false);
    };

    const renderChat = () => {
        const selectedMessages = messages[selectedConversationId] || [];
        return <section className={chatStyles.conversation} aria-label="Parent conversation"><header className={chatStyles.conversationHeader}><span className={chatStyles.teacherAvatarWrap}><span className={chatStyles.teacherAvatar}>{getInitials(selectedConversation.parent)}</span><span className={`${chatStyles.presenceDot} ${chatStyles[selectedConversation.status === "online" ? "presenceActive" : selectedConversation.status === "busy" ? "presenceBusy" : "presenceOffline"]}`} /></span><div className={chatStyles.conversationHeading}><div className={chatStyles.conversationTitle}>{selectedConversation.parent}</div><div className={chatStyles.conversationSubtitle}>Parent of {selectedConversation.student}</div></div></header><div className={chatStyles.messageList}><div className={chatStyles.dateDivider}>Today</div>{selectedMessages.map((message) => <div className={`${chatStyles.messageRow} ${message.mine ? chatStyles.messageMineRow : ""}`} key={message.id}><article className={`${chatStyles.message} ${message.mine ? chatStyles.messageMine : ""}`}>{!message.mine && <div className={chatStyles.messageSender}>{selectedConversation.parent}</div>}<div className={chatStyles.messageText}>{message.text}</div><div className={chatStyles.messageTime}>{message.time}</div></article></div>)}</div><form className={chatStyles.messageComposer} onSubmit={handleSendMessage}><input className={chatStyles.messageInput} value={messageText} onChange={(event) => setMessageText(event.target.value)} placeholder="Write a message..." aria-label={`Message ${selectedConversation.parent}`} /><button type="submit">Send</button></form></section>;
    };

    const renderClasses = () => <section className={`${styles.page} ${styles.classesPage}`} aria-label="Classes"><div className={styles.classesWorkspace}><div className={styles.classGrid}>{teacherClasses.map((item) => <article className={`${styles.classCard} ${item.id === selectedClassId ? styles.activeClass : ""}`} key={item.id}><button type="button" className={styles.classHeader} onClick={() => setSelectedClassId(item.id)}><span>{getInitials(item.name)}</span><strong>{item.name}</strong></button></article>)}</div><aside className={styles.classDetails}><div className={styles.classDetailsHeader}><div><span className={styles.eyebrow}>SELECTED CLASS</span><h2>{selectedClass.name}</h2></div><span className={styles.classDetailsCount}>{selectedClass.students.length} students</span></div><div className={styles.studentList}>{selectedClass.students.filter((student) => visibleStudents.some((visible) => visible.id === student.id)).map((student) => <button type="button" className={`${styles.studentRow} ${student.id === selectedStudentId ? styles.selectedStudent : ""}`} key={student.id} onClick={() => chooseStudent(student)}><span className={styles.studentAvatar}>{getInitials(student.name)}</span><span><strong>{student.name}</strong><small>{student.parent}</small></span><b>{student.status}</b></button>)}</div></aside><aside className={styles.classSchedule}><div className={styles.classDetailsHeader}><div><span className={styles.eyebrow}>TEACHER SCHEDULE</span><h2>{selectedClass.name}</h2></div></div><div className={styles.scheduleList}>{(teacherClassSchedule[selectedClass.id] || []).map((lecture) => <article className={styles.scheduleItem} key={lecture.id}><strong>{lecture.day}</strong><span>{lecture.time}</span></article>)}</div></aside></div><footer className={styles.classFooter}><div><span className={styles.eyebrow}>CLASS WORKSPACE</span><p>Review students and keep your {selectedClass.name} information ready for the next lesson.</p></div><div className={styles.classFooterMeta}><span>{selectedClass.students.length} students</span><span>{(teacherClassSchedule[selectedClass.id] || []).length} weekly lectures</span></div></footer></section>;

    const renderCalendar = () => <section className={`${styles.page} ${styles.calendarPage}`} aria-label="Teacher calendar"><div className={styles.calendarToolbar}><div className={styles.monthControls}><button type="button" onClick={() => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}>‹</button><strong>{monthLabel}</strong><button type="button" onClick={() => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}>›</button></div><button type="button" className={styles.primaryButton} onClick={() => setIsAddingEvent((current) => !current)}>{isAddingEvent ? "Close" : "Add event"}</button></div>{isAddingEvent && <form className={styles.eventForm} onSubmit={handleAddEvent}><input value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} placeholder="Event title" aria-label="Event title" /><select value={eventForm.target} onChange={(event) => setEventForm({ ...eventForm, target: event.target.value })}><option value="class">All students in {selectedClass.name}</option><option value="student">Only {selectedStudent.name}</option></select><div className={styles.colorPicker}>{eventColors.map((color) => <button type="button" key={color} className={`${styles.colorButton} ${styles[color]} ${eventForm.color === color ? styles.activeColor : ""}`} onClick={() => setEventForm({ ...eventForm, color })} aria-label={`${color} event`} />)}</div><span>Selected date: {selectedDate}</span><button className={styles.primaryButton}>Save event</button></form>}<div className={styles.calendarGrid}>{weekdays.map((day) => <div className={styles.weekday} key={day}>{day}</div>)}{calendarDays.map((date) => { const dateKey = formatDateKey(date); const dayEvents = events.filter((item) => item.date === dateKey); return <button type="button" key={dateKey} className={`${styles.dayCell} ${date.getMonth() !== monthDate.getMonth() ? styles.outsideMonth : ""} ${dateKey === selectedDate ? styles.selectedDay : ""}`} onClick={() => { setSelectedDate(dateKey); setIsAddingEvent(true); }}><span>{date.getDate()}</span>{dayEvents.map((item) => <small className={`${styles.event} ${styles[item.color]}`} key={item.id}>{item.title}</small>)}</button>; })}</div></section>;

    const renderReports = () => <section className={`${styles.page} ${styles.reportsPage}`} aria-label="Write reports"><div className={styles.reportWorkspace}><form className={styles.reportForm} onSubmit={(event) => { event.preventDefault(); const reportClass = teacherClasses.find((item) => item.id === reportForm.classId) || teacherClasses[0]; const reportStudent = reportClass.students.find((student) => student.id === reportForm.studentId) || reportClass.students[0]; setReportHistory((current) => [{ id: Date.now(), className: reportClass.name, student: reportStudent.name, studentId: reportStudent.id, type: reportForm.type, date: reportForm.date, content: reportForm.content }, ...current]); setReportForm({ ...reportForm, content: "" }); showNotice(`Report published for ${reportStudent.name}.`); }}><div className={styles.reportFields}><label>Choose class<select value={reportForm.classId} onChange={(event) => { const nextClass = teacherClasses.find((item) => item.id === event.target.value) || teacherClasses[0]; setReportForm({ ...reportForm, classId: nextClass.id, studentId: nextClass.students[0].id }); }}>{teacherClasses.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Choose student<select value={reportForm.studentId} onChange={(event) => setReportForm({ ...reportForm, studentId: event.target.value })}>{(teacherClasses.find((item) => item.id === reportForm.classId) || teacherClasses[0]).students.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)}</select></label><label>Report date<input type="date" value={reportForm.date} onChange={(event) => setReportForm({ ...reportForm, date: event.target.value })} /></label><label>Report type<select value={reportForm.type} onChange={(event) => setReportForm({ ...reportForm, type: event.target.value })}><option>Academic progress</option><option>Behavior / participation</option><option>Attendance</option></select></label></div><label className={styles.reportDescription}>Description<textarea required value={reportForm.content} onChange={(event) => setReportForm({ ...reportForm, content: event.target.value })} placeholder="Write the report description" /></label><button type="submit" className={styles.primaryButton}>Publish report</button></form><aside className={styles.reportHistory}><div className={styles.reportHistoryHeader}><span className={styles.eyebrow}>REPORT HISTORY</span><h2>Previous reports</h2></div><div className={styles.reportHistoryList}>{reportHistory.map((report) => <article className={styles.reportHistoryItem} key={report.id}><div className={styles.reportHistoryTopline}><strong>{report.student}</strong><span>{report.date || report.period}</span></div><small>{report.className || "Assigned class"} · {report.type}</small><p>{report.content}</p></article>)}</div></aside></div></section>;

    const renderAI = () => <section className={styles.page} aria-label="AI analysis"><div className={styles.aiWorkspace}><aside className={styles.aiPrompt}><div className={styles.scopeButtons}><button className={analysisScope === "student" ? styles.activeSegment : ""} onClick={() => setAnalysisScope("student")}>One student</button><button className={analysisScope === "class" ? styles.activeSegment : ""} onClick={() => setAnalysisScope("class")}>Whole class</button></div><textarea defaultValue={`Summarize the performance of ${analysisScope === "student" ? selectedStudent.name : selectedClass.name}.`} /><button className={styles.primaryButton} onClick={() => showNotice("Analysis prepared.")}>Analyze</button></aside><article className={styles.aiResult}><span className={styles.eyebrow}>AI SUMMARY</span><h2>{analysisScope === "student" ? selectedStudent.name : selectedClass.name}</h2><p>{analysisScope === "student" ? `${selectedStudent.name} is showing positive progress in Mathematics. Grades, attendance, and teacher reports indicate a strong foundation for continued improvement.` : `${selectedClass.name} is progressing steadily. Most students are participating positively, while a small group may benefit from additional revision and targeted support.`}</p><div className={styles.sourceChips}><span>Grades</span><span>Attendance</span><span>Reports</span></div></article></div></section>;

    void renderCalendar;
    void renderAI;
    const pageContent = selectedPage === "Chat" ? renderChat() : selectedPage === "Classes" ? renderClasses() : selectedPage === "Calendar" ? <CalendarPage /> : selectedPage === "Reports" ? renderReports() : <TeacherAIAnalysisPage selectedClass={selectedClass} selectedStudent={selectedStudent} />;

    return <main className={`${shellStyles.dashboard} ${shellStyles.teacherDashboard}`}><aside className={shellStyles.pageRail} aria-label="Teacher pages and parent conversations"><div className={shellStyles.pageLabel}>Pages</div><nav className={shellStyles.pageList}>{pageItems.map((page) => <button type="button" key={page} className={`${shellStyles.pageButton} ${selectedPage === page ? shellStyles.selectedPage : ""}`} onClick={() => setSelectedPage(page)}>{page}</button>)}</nav>{selectedPage === "Chat" && <input className={chatStyles.teacherSearch} value={parentSearch} onChange={(event) => setParentSearch(event.target.value)} placeholder="Search parents" aria-label="Search parents" />}{selectedPage === "Chat" && <aside className={chatStyles.teacherSidebar} aria-label="Parent conversations"><div className={chatStyles.teacherList}>{visibleParents.map((parent) => <button type="button" key={parent.id} className={`${chatStyles.teacherButton} ${selectedConversationId === parent.id ? chatStyles.selectedTeacher : ""}`} onClick={() => setSelectedConversationId(parent.id)}><span className={chatStyles.teacherAvatarWrap}><span className={chatStyles.teacherAvatar}>{getInitials(parent.parent)}</span><span className={`${chatStyles.presenceDot} ${chatStyles[parent.status === "online" ? "presenceActive" : parent.status === "busy" ? "presenceBusy" : "presenceOffline"]}`} /></span><span className={chatStyles.teacherButtonContent}><span className={chatStyles.teacherButtonTopline}><span className={chatStyles.teacherButtonName}>{parent.parent}</span><span className={chatStyles.teacherButtonTime}>{parent.time}</span></span><span className={chatStyles.teacherButtonSubject}>{parent.student}</span><span className={chatStyles.teacherButtonPreview}>{parent.lastMessage}</span></span></button>)}</div></aside>}</aside><section className={shellStyles.dashboardMain}><header className={shellStyles.chatHeader}><div className={shellStyles.chatHeaderContent}><div className={styles.classSwitcher} aria-label="Choose class">{teacherClasses.map((item) => <button type="button" key={item.id} className={`${styles.classButton} ${selectedClassId === item.id ? styles.selectedClassButton : ""}`} onClick={() => setSelectedClassId(item.id)}>{item.name}</button>)}</div></div><button type="button" className={shellStyles.logoutButton} onClick={() => navigate("/")} aria-label="Log out" title="Log out"><LogoutIcon /></button></header><div className={shellStyles.chatBody}>{pageContent}</div></section>{notice && <div className={styles.notice}>{notice}</div>}</main>;
}

export default TeacherDashboardPage;
