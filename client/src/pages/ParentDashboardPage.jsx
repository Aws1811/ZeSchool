import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChatPage, { TeacherConversationList, TeacherSearch } from "./ChatPage";
import styles from "../styles/dashboard-shell.module.css";
import ThemeToggle from "../components/ThemeToggle";
import EmptyDataPage from "../components/EmptyDataPage";
import { getChatContext } from "../api/chatApi";

const pageItems = [
    "Chat",
    "Calendar",
    "Grades",
    "Reports",
    "Bus",
    "Smart watch",
    "AI analysis",
];

function LogoutIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M10 5H6.8C5.806 5 5 5.806 5 6.8v10.4c0 .994.806 1.8 1.8 1.8H10M14 8l4 4-4 4M18 12H9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function getStudentInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function ParentDashboardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
    const [theme, setTheme] = useState(() => window.localStorage.getItem("zeschool-theme") || "dark");
    const [selectedPage, setSelectedPage] = useState("Chat");
    const [selectedConversationId, setSelectedConversationId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [chatContext, setChatContext] = useState(null);
    const students = chatContext?.students || location.state?.students || [];
    const selectedStudent = students[selectedStudentIndex] || students[0] || { id: "", name: "Loading students" };
    const studentConversations = chatContext?.conversations?.filter((conversation) => conversation.student.id === selectedStudent.id) || [];
    const activeConversationId = studentConversations.some((conversation) => conversation.id === selectedConversationId)
        ? selectedConversationId
        : studentConversations[0]?.id || "";

    useEffect(() => {
        getChatContext("parent", undefined, location.state?.email)
            .then(setChatContext)
            .catch(() => setChatContext({ students: [], conversations: [] }));
    }, [location.state?.email]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem("zeschool-theme", theme);
    }, [theme]);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <main className={`${styles.dashboard} ${theme === "light" ? "light-theme" : ""}`}>
            <aside className={styles.pageRail} aria-label="Parent pages and teacher conversations">
                <div className={styles.pageLabel}>Pages</div>
                <nav className={styles.pageList}>
                    {pageItems.map((page) => (
                        <Button
                            key={page}
                            className={`${styles.pageButton} ${selectedPage === page ? styles.selectedPage : ""}`}
                            onClick={() => setSelectedPage(page)}
                        >
                            {page}
                        </Button>
                    ))}
                </nav>
                {selectedPage === "Chat" && <TeacherSearch searchText={searchText} onSearchChange={setSearchText} />}
                {selectedPage === "Chat" && (
                    <div className={styles.teacherHistory}>
                        <TeacherConversationList
                            selectedConversationId={activeConversationId}
                            onSelectConversation={setSelectedConversationId}
                            searchText={searchText}
                            conversations={studentConversations}
                        />
                    </div>
                )}
            </aside>

            <section className={styles.dashboardMain}>
                <header className={styles.chatHeader}>
                    <div className={styles.chatHeaderContent}>
                        <div className={styles.childSwitcher} aria-label="Choose student">
                            {students.map((student, index) => (
                                <Button
                                    key={`${student.name}-${index}`}
                                    className={`${styles.childButton} ${selectedStudentIndex === index ? styles.selectedChild : ""}`}
                                    onClick={() => setSelectedStudentIndex(index)}
                                    title={student.name}
                                    aria-label={student.name}
                                >
                                    {getStudentInitials(student.name)}
                                </Button>
                            ))}
                        </div>
                        <div className={styles.chatSubtitle}>{selectedStudent.name}</div>
                    </div>
                    <div className={styles.headerActions}>
                        <ThemeToggle theme={theme} onToggle={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
                        <IconButton
                            className={styles.logoutButton}
                            onClick={handleLogout}
                            aria-label="Log out"
                            title="Log out"
                        >
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </header>

                <div className={styles.chatBody}>
                    {selectedPage === "Chat" ? (
                        <ChatPage
                            selectedConversationId={activeConversationId}
                            userId={chatContext?.user?.id}
                            conversations={studentConversations}
                        />
                    ) : (
                        <EmptyDataPage
                            title={`${selectedPage} data`}
                            description={`No ${selectedPage.toLowerCase()} data is available for ${selectedStudent.name} yet.`}
                        />
                    )}
                </div>
            </section>
        </main>
    );
}

export default ParentDashboardPage;
