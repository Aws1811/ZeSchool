import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyDataPage from "../components/EmptyDataPage";
import { createChatSocket, getChatContext, getConversationMessages } from "../api/chatApi";
import shellStyles from "../styles/dashboard-shell.module.css";
import ThemeToggle from "../components/ThemeToggle";
import chatStyles from "../styles/chat.module.css";

const pageItems = ["Chat", "Classes", "Calendar", "Reports", "AI analysis"];

function LogoutIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 5H6.8C5.806 5 5 5.806 5 6.8v10.4c0 .994.806 1.8 1.8 1.8H10M14 8l4 4-4 4M18 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function formatTime(value) {
    if (!value) return "";
    return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function TeacherDashboardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState("Chat");
    const [theme, setTheme] = useState(() => window.localStorage.getItem("zeschool-theme") || "dark");
    const [selectedConversationId, setSelectedConversationId] = useState("");
    const [parentSearch, setParentSearch] = useState("");
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatContext, setChatContext] = useState(null);
    const chatSocketRef = useRef(null);
    const conversations = chatContext?.conversations || [];
    const activeConversationId = conversations.some((conversation) => conversation.id === selectedConversationId)
        ? selectedConversationId
        : conversations[0]?.id || "";
    const selectedConversation = conversations.find((conversation) => conversation.id === activeConversationId);
    const visibleConversations = conversations.filter((conversation) => conversation.parent.name.toLowerCase().includes(parentSearch.toLowerCase()));

    useEffect(() => {
        getChatContext("teacher", undefined, location.state?.email)
            .then(setChatContext)
            .catch(() => setChatContext({ user: null, conversations: [] }));
    }, [location.state?.email]);

    useEffect(() => {
        const userId = chatContext?.user?.id;
        if (!activeConversationId || !userId) return undefined;

        let isCurrentConversation = true;
        const socket = createChatSocket(userId);
        chatSocketRef.current = socket;

        getConversationMessages(activeConversationId, userId)
            .then((data) => {
                if (isCurrentConversation) setMessages(data.messages);
            })
            .catch(() => {
                if (isCurrentConversation) setMessages([]);
            });

        socket.on("connect", () => {
            socket.emit("chat:join", { conversationId: activeConversationId });
        });

        socket.on("chat:history", (data) => {
            if (data.conversation.id === activeConversationId && isCurrentConversation) {
                setMessages(data.messages);
            }
        });

        socket.on("chat:message", (message) => {
            if (message.conversationId === activeConversationId && isCurrentConversation) {
                setMessages((currentMessages) => {
                    if (currentMessages.some((item) => item.id === message.id)) return currentMessages;
                    return [...currentMessages, { ...message, mine: message.senderId === userId }];
                });
            }
        });

        return () => {
            isCurrentConversation = false;
            chatSocketRef.current = null;
            socket.disconnect();
        };
    }, [activeConversationId, chatContext?.user?.id]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem("zeschool-theme", theme);
    }, [theme]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        const text = messageText.trim();
        if (!text || !activeConversationId || !chatSocketRef.current?.connected) return;

        chatSocketRef.current.emit("chat:send", {
            conversationId: activeConversationId,
            body: text,
        });
        setMessageText("");
    };

    const renderChat = () => {
        if (!selectedConversation) {
            return <section className={chatStyles.conversation}><div className={chatStyles.noTeachers}>No parent conversations found.</div></section>;
        }

        return (
            <section className={chatStyles.conversation} aria-label="Parent conversation">
                <header className={chatStyles.conversationHeader}>
                    <span className={chatStyles.teacherAvatarWrap}>
                        <span className={chatStyles.teacherAvatar}>{getInitials(selectedConversation.parent.name)}</span>
                    </span>
                    <div className={chatStyles.conversationHeading}>
                        <div className={chatStyles.conversationTitle}>{selectedConversation.parent.name}</div>
                        <div className={chatStyles.conversationSubtitle}>Parent of {selectedConversation.student.name}</div>
                    </div>
                </header>
                <div className={chatStyles.messageList}>
                    <div className={chatStyles.dateDivider}>Conversation</div>
                    {messages.map((message) => (
                        <div className={`${chatStyles.messageRow} ${message.mine ? chatStyles.messageMineRow : ""}`} key={message.id}>
                            <article className={`${chatStyles.message} ${message.mine ? chatStyles.messageMine : ""}`}>
                                {!message.mine && <div className={chatStyles.messageSender}>{message.sender}</div>}
                                <div className={chatStyles.messageText}>{message.text}</div>
                                <div className={chatStyles.messageTime}>{formatTime(message.createdAt)}</div>
                            </article>
                        </div>
                    ))}
                    {!messages.length && <div className={chatStyles.noTeachers}>No messages yet.</div>}
                </div>
                <form className={chatStyles.messageComposer} onSubmit={handleSendMessage}>
                    <input className={chatStyles.messageInput} value={messageText} onChange={(event) => setMessageText(event.target.value)} placeholder="Write a message..." aria-label={`Message ${selectedConversation.parent.name}`} />
                    <button type="submit">Send</button>
                </form>
            </section>
        );
    };

    return (
        <main className={`${shellStyles.dashboard} ${shellStyles.teacherDashboard} ${theme === "light" ? "light-theme" : ""}`}>
            <aside className={shellStyles.pageRail} aria-label="Teacher pages and parent conversations">
                <div className={shellStyles.pageLabel}>Pages</div>
                <nav className={shellStyles.pageList}>
                    {pageItems.map((page) => (
                        <button type="button" key={page} className={`${shellStyles.pageButton} ${selectedPage === page ? shellStyles.selectedPage : ""}`} onClick={() => setSelectedPage(page)}>
                            {page}
                        </button>
                    ))}
                </nav>
                {selectedPage === "Chat" && <input className={chatStyles.teacherSearch} value={parentSearch} onChange={(event) => setParentSearch(event.target.value)} placeholder="Search parents" aria-label="Search parents" />}
                {selectedPage === "Chat" && (
                    <aside className={chatStyles.teacherSidebar} aria-label="Parent conversations">
                        <div className={chatStyles.teacherList}>
                            {visibleConversations.map((conversation) => (
                                <button type="button" key={conversation.id} className={`${chatStyles.teacherButton} ${activeConversationId === conversation.id ? chatStyles.selectedTeacher : ""}`} onClick={() => setSelectedConversationId(conversation.id)}>
                                    <span className={chatStyles.teacherAvatarWrap}>
                                        <span className={chatStyles.teacherAvatar}>{getInitials(conversation.parent.name)}</span>
                                    </span>
                                    <span className={chatStyles.teacherButtonContent}>
                                        <span className={chatStyles.teacherButtonTopline}>
                                            <span className={chatStyles.teacherButtonName}>{conversation.parent.name}</span>
                                            <span className={chatStyles.teacherButtonTime}>{formatTime(conversation.lastMessageAt)}</span>
                                        </span>
                                        <span className={chatStyles.teacherButtonSubject}>{conversation.student.name}</span>
                                        <span className={chatStyles.teacherButtonPreview}>{conversation.lastMessage}</span>
                                    </span>
                                </button>
                            ))}
                            {!visibleConversations.length && <div className={chatStyles.noTeachers}>No parent conversations found.</div>}
                        </div>
                    </aside>
                )}
            </aside>
            <section className={shellStyles.dashboardMain}>
                <header className={shellStyles.chatHeader}>
                    <div className={shellStyles.chatHeaderContent}>
                        <div className={shellStyles.chatSubtitle}>{chatContext?.user?.name || "Teacher"}</div>
                    </div>
                    <div className={shellStyles.headerActions}>
                        <ThemeToggle theme={theme} onToggle={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
                        <button type="button" className={shellStyles.logoutButton} onClick={() => navigate("/")} aria-label="Log out" title="Log out"><LogoutIcon /></button>
                    </div>
                </header>
                <div className={shellStyles.chatBody}>
                    {selectedPage === "Chat" ? renderChat() : <EmptyDataPage title={`${selectedPage} data`} description={`No ${selectedPage.toLowerCase()} data is available yet.`} />}
                </div>
            </section>
        </main>
    );
}

export default TeacherDashboardPage;
