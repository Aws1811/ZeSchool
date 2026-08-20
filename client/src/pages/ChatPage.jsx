import { useState } from "react";
import { Button } from "@mui/material";
import { initialMessages, presenceClasses, presenceLabels, teachers } from "../data/chatData";
import styles from "../styles/chat.module.css";

function PresenceDot({ teacher }) {
    return (
        <span
            className={`${styles.presenceDot} ${styles[presenceClasses[teacher.status]]}`}
            data-status={presenceLabels[teacher.status]}
            aria-label={`${teacher.name} is ${presenceLabels[teacher.status].toLowerCase()}`}
            title={presenceLabels[teacher.status]}
        />
    );
}

export function TeacherSearch({ searchText, onSearchChange }) {
    return (
        <input
            className={styles.teacherSearch}
            type="text"
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search teachers"
            aria-label="Search teachers"
        />
    );
}

export function TeacherConversationList({ selectedTeacherId, onSelectTeacher, searchText }) {
    const visibleTeachers = teachers.filter((teacher) => {
        const value = searchText.trim().toLowerCase();
        return !value || `${teacher.name} ${teacher.subject}`.toLowerCase().includes(value);
    });

    return (
        <aside className={styles.teacherSidebar} aria-label="Teacher conversations">
            <div className={styles.teacherList}>
                {visibleTeachers.map((teacher) => (
                    <Button
                        key={teacher.id}
                        className={`${styles.teacherButton} ${selectedTeacherId === teacher.id ? styles.selectedTeacher : ""}`}
                        onClick={() => onSelectTeacher(teacher.id)}
                    >
                        <span className={styles.teacherAvatarWrap}>
                            <span className={styles.teacherAvatar}>{teacher.initials}</span>
                            <PresenceDot teacher={teacher} />
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
    );
}

function ChatPage({ selectedTeacherId }) {
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState(initialMessages);
    const selectedTeacher = teachers.find((teacher) => teacher.id === selectedTeacherId) || teachers[0];
    const selectedMessages = messages[selectedTeacherId] || [];

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
        <section className={styles.conversation} aria-label="Conversation">
            <header className={styles.conversationHeader}>
                <span className={styles.teacherAvatarWrap}>
                    <span className={styles.teacherAvatar}>{selectedTeacher.initials}</span>
                    <PresenceDot teacher={selectedTeacher} />
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
                <input
                    className={styles.messageInput}
                    type="text"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    placeholder="Write a message..."
                    aria-label={`Message ${selectedTeacher.name}`}
                />
                <Button type="submit" variant="contained">Send</Button>
            </form>
        </section>
    );
}

export default ChatPage;
