import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AIAnalysisPage from "./AIAnalysisPage";
import BusPage from "./BusPage";
import CalendarPage from "./CalendarPage";
import ReportsPage from "./ReportsPage";
import SmartwatchPage from "./SmartwatchPage";
import GradesPage from "./GradesPage";
import ChatPage, { TeacherConversationList, TeacherSearch } from "./ChatPage";
import styles from "../styles/dashboard-shell.module.css";

const pageItems = [
    "Chat",
    "Calendar",
    "Grades",
    "Reports",
    "Bus",
    "Smart watch",
    "AI analysis",
];

const defaultChildren = [
    { name: "Child 1" },
    { name: "Child 2" },
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

function getChildInitials(name) {
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
    const [selectedChildIndex, setSelectedChildIndex] = useState(0);
    const [selectedPage, setSelectedPage] = useState("Chat");
    const [selectedTeacherId, setSelectedTeacherId] = useState("teacher-1");
    const [searchText, setSearchText] = useState("");
    const children = location.state?.children?.length ? location.state.children : defaultChildren;
    const selectedChild = children[selectedChildIndex] || children[0];

    const handleLogout = () => {
        localStorage.removeItem("zeschoolUser");
        localStorage.removeItem("zeschoolChildren");
        navigate("/");
    };

    return (
        <main className={styles.dashboard}>
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
                            selectedTeacherId={selectedTeacherId}
                            onSelectTeacher={setSelectedTeacherId}
                            searchText={searchText}
                        />
                    </div>
                )}
            </aside>

            <section className={styles.dashboardMain}>
                <header className={styles.chatHeader}>
                    <div className={styles.chatHeaderContent}>
                        <div className={styles.childSwitcher} aria-label="Choose child">
                            {children.map((child, index) => (
                                <Button
                                    key={`${child.name}-${index}`}
                                    className={`${styles.childButton} ${selectedChildIndex === index ? styles.selectedChild : ""}`}
                                    onClick={() => setSelectedChildIndex(index)}
                                    title={child.name}
                                    aria-label={child.name}
                                >
                                    {getChildInitials(child.name)}
                                </Button>
                            ))}
                        </div>
                        <div className={styles.chatSubtitle}>{selectedChild.name}</div>
                    </div>
                    <IconButton
                        className={styles.logoutButton}
                        onClick={handleLogout}
                        aria-label="Log out"
                        title="Log out"
                    >
                        <LogoutIcon />
                    </IconButton>
                </header>

                <div className={styles.chatBody}>
                    {selectedPage === "Chat" ? (
                        <ChatPage
                            selectedTeacherId={selectedTeacherId}
                            onSelectTeacher={setSelectedTeacherId}
                        />
                    ) : selectedPage === "Calendar" ? (
                        <CalendarPage />
                    ) : selectedPage === "Grades" ? (
                        <GradesPage child={selectedChild} />
                    ) : selectedPage === "AI analysis" ? (
                        <AIAnalysisPage child={selectedChild} />
                    ) : selectedPage === "Bus" ? (
                        <BusPage child={selectedChild} />
                    ) : selectedPage === "Reports" ? (
                        <ReportsPage child={selectedChild} />
                    ) : selectedPage === "Smart watch" ? (
                        <SmartwatchPage child={selectedChild} />
                    ) : (
                        <div className={styles.emptyChat}>
                            <div className={styles.emptyChatTitle}>
                                {selectedPage} placeholder
                            </div>
                            <div className={styles.emptyChatText}>
                                This area is ready for the {selectedPage.toLowerCase()} experience for {selectedChild.name}.
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default ParentDashboardPage;
