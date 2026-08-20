import { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "../styles/chat.module.css";

const teachers = [
    {
        id: "teacher-1",
        name: "Ms. Noor",
        subject: "Mathematics",
        preview: "Adam did very well in today's lesson.",
        time: "10:42",
        unread: 2,
        initials: "NN",
        status: "active",
    },
    {
        id: "teacher-2",
        name: "Mr. Kareem",
        subject: "Science",
        preview: "The project deadline is next Thursday.",
        time: "Yesterday",
        unread: 0,
        initials: "KK",
        status: "busy",
    },
    {
        id: "teacher-3",
        name: "Ms. Sarah",
        subject: "English",
        preview: "Please review the reading assignment.",
        time: "Mon",
        unread: 0,
        initials: "SS",
        status: "offline",
    },
];

const presenceClasses = {
    active: "presenceActive",
    busy: "presenceBusy",
    offline: "presenceOffline",
};

const presenceLabels = {
    active: "Active",
    busy: "Busy",
    offline: "Offline",
};

const initialMessages = {
    "teacher-1": [
        {
            id: 1,
            sender: "Ms. Noor",
            text: "Good morning. Adam participated very well in class today.",
            time: "10:18 AM",
        },
        {
            id: 2,
            sender: "You",
            mine: true,
            text: "Thank you for the update. Is there anything we should review at home?",
            time: "10:24 AM",
        },
        {
            id: 3,
            sender: "Ms. Noor",
            text: "A quick review of fractions would be helpful before Thursday.",
            time: "10:42 AM",
        },
    ],
    "teacher-2": [
        {
            id: 4,
            sender: "Mr. Kareem",
            text: "The science project deadline is next Thursday.",
            time: "Yesterday",
        },
    ],
    "teacher-3": [
        {
            id: 5,
            sender: "Ms. Sarah",
            text: "Please review the reading assignment before our next lesson.",
            time: "Monday",
        },
    ],
};

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function ChatPage() {
    const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0].id);
    const [searchText, setSearchText] = useState("");
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState(initialMessages);
    const selectedTeacher = teachers.find((teacher) => teacher.id === selectedTeacherId) || teachers[0];
    const selectedMessages = messages[selectedTeacherId] || [];
    const visibleTeachers = teachers.filter((teacher) => {
        const value = searchText.trim().toLowerCase();
        return !value || `${teacher.name} ${teacher.subject}`.toLowerCase().includes(value);
    });

    const handleSendMessage = (event) => {
        event.preventDefault();
        const trimmedMessage = messageText.trim();

        if (!trimmedMessage) {
            return;
        }

        setMessages((currentMessages) => ({
            ...currentMessages,
            [selectedTeacherId]: [
                ...(currentMessages[selectedTeacherId] || []),
                {
                    id: Date.now(),
                    sender: "You",
                    mine: true,
                    text: trimmedMessage,
                    time: "Now",
                },
            ],
        }));
        setMessageText("");
    };

    return (
        <div className={styles.chatWorkspace}>
            <aside className={styles.teacherSidebar} aria-label="Teacher conversations">
                <TextField
                    className={styles.teacherSearch}
                    size="small"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search teachers"
                    aria-label="Search teachers"
                />
                <div className={styles.teacherList}>
                    {visibleTeachers.map((teacher) => (
                        <Button
                            key={teacher.id}
                            className={`${styles.teacherButton} ${selectedTeacherId === teacher.id ? styles.selectedTeacher : ""}`}
                            onClick={() => setSelectedTeacherId(teacher.id)}
                        >
                            <span className={styles.teacherAvatarWrap}>
                                <span className={styles.teacherAvatar}>{teacher.initials}</span>
                                <span
                                    className={`${styles.presenceDot} ${styles[presenceClasses[teacher.status]]}`}
                                    data-status={presenceLabels[teacher.status]}
                                    aria-label={`${teacher.name} is ${presenceLabels[teacher.status].toLowerCase()}`}
                                    title={presenceLabels[teacher.status]}
                                />
                            </span>
                            <span className={styles.teacherButtonContent}>
                                <span className={styles.teacherButtonTopline}>
                                    <span className={styles.teacherButtonName}>{teacher.name}</span>
                                    <span className={styles.teacherButtonTime}>{teacher.time}</span>
                                </span>
                                <span className={styles.teacherButtonSubject}>{teacher.subject}</span>
                                <span className={styles.teacherButtonPreview}>{teacher.preview}</span>
                            </span>
                            {teacher.unread > 0 && <span className={styles.unreadBadge}>{teacher.unread}</span>}
                        </Button>
                    ))}
                    {!visibleTeachers.length && <div className={styles.noTeachers}>No teachers found.</div>}
                </div>
            </aside>

            <section className={styles.conversation} aria-label="Conversation">
                <header className={styles.conversationHeader}>
                    <span className={styles.teacherAvatarWrap}>
                        <span className={styles.teacherAvatar}>{selectedTeacher.initials || getInitials(selectedTeacher.name)}</span>
                        <span
                            className={`${styles.presenceDot} ${styles[presenceClasses[selectedTeacher.status]]}`}
                            data-status={presenceLabels[selectedTeacher.status]}
                            aria-label={`${selectedTeacher.name} is ${presenceLabels[selectedTeacher.status].toLowerCase()}`}
                            title={presenceLabels[selectedTeacher.status]}
                        />
                    </span>
                    <div className={styles.conversationHeading}>
                        <div className={styles.conversationTitle}>{selectedTeacher.name}</div>
                        <div className={styles.conversationSubtitle}>{selectedTeacher.subject}</div>
                    </div>
                </header>

                <div className={styles.messageList}>
                    <div className={styles.dateDivider}>Today</div>
                    {selectedMessages.map((message) => (
                        <div
                            className={`${styles.messageRow} ${message.mine ? styles.messageMineRow : ""}`}
                            key={message.id}
                        >
                            <article className={`${styles.message} ${message.mine ? styles.messageMine : ""}`}>
                                {!message.mine && <div className={styles.messageSender}>{message.sender}</div>}
                                <div className={styles.messageText}>{message.text}</div>
                                <div className={styles.messageTime}>{message.time}</div>
                            </article>
                        </div>
                    ))}
                </div>

                <form className={styles.messageComposer} onSubmit={handleSendMessage}>
                    <TextField
                        fullWidth
                        size="small"
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                        placeholder="Write a message..."
                        aria-label={`Message ${selectedTeacher.name}`}
                    />
                    <Button type="submit" variant="contained">Send</Button>
                </form>
            </section>
        </div>
    );
}

export default ChatPage;

