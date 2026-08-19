import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { messages as starterMessages, parentChats } from "../../data/mockData";
import styles from "../../styles/app.module.css";
import TeacherStudentPanel from "./TeacherStudentPanel";

function Conversation({ title, subtitle, teacher }) {
    const [messages, setMessages] = useState(starterMessages);
    const [draft, setDraft] = useState("");

    const sendMessage = (event) => {
        event.preventDefault();
        if (!draft.trim()) return;

        setMessages((current) => [
            ...current,
            { id: Date.now(), sender: "You", mine: true, text: draft.trim(), time: "Now" },
        ]);
        setDraft("");
    };

    return (
        <section className={styles.conversation}>
            <header className={styles.conversationHeader}>
                <div className={styles.avatar}>{teacher ? "AS" : "NN"}</div>
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <span className={styles.status}>Active</span>
            </header>

            <div className={styles.messageArea}>
                <div className={styles.dateDivider}>Today</div>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.messageRow} ${message.mine ? styles.messageMineRow : ""}`}
                    >
                        <div className={`${styles.messageBubble} ${message.mine ? styles.messageMine : ""}`}>
                            {!message.mine && <strong>{message.sender}</strong>}
                            <p>{message.text}</p>
                            <span>{message.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <form className={styles.composer} onSubmit={sendMessage}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a message..."
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                />
                <Button type="submit" variant="contained">Send</Button>
            </form>
        </section>
    );
}

function ParentConversationList() {
    return (
        <aside className={styles.chatList}>
            <div className={styles.chatListHeader}>
                <strong>Teachers</strong>
                <span>Adam · 7-B</span>
            </div>
            <div className={styles.studentSearch}>Search conversations</div>
            {parentChats.map((chat, index) => (
                <button
                    type="button"
                    key={chat.id}
                    className={`${styles.chatItem} ${index === 0 ? styles.chatItemActive : ""}`}
                >
                    <span className={styles.avatar}>{chat.initials}</span>
                    <span className={styles.chatText}>
                        <span className={styles.chatNameLine}>
                            <strong>{chat.name}</strong>
                            <small>{chat.time}</small>
                        </span>
                        <span className={styles.chatSubject}>{chat.subject}</span>
                        <span className={styles.chatPreview}>{chat.preview}</span>
                    </span>
                    {chat.unread > 0 && <span className={styles.badge}>{chat.unread}</span>}
                </button>
            ))}
        </aside>
    );
}

function ChatWorkspace({ role }) {
    const teacher = role === "teacher";

    return (
        <div className={styles.chatWorkspace}>
            {teacher ? <TeacherStudentPanel /> : <ParentConversationList />}
            <Conversation
                teacher={teacher}
                title={teacher ? "Adam Shaheen" : "Ms. Noor"}
                subtitle={teacher ? "Parent: Murad Shaheen · Grade 7-B" : "Mathematics teacher"}
            />
            <aside className={styles.contextPanel}>
                <div className={styles.contextAvatar}>{teacher ? "AS" : "NN"}</div>
                <h3>{teacher ? "Adam Shaheen" : "Ms. Noor"}</h3>
                <p>{teacher ? "Grade 7-B" : "Mathematics"}</p>
                <div className={styles.contextSection}>
                    <span>{teacher ? "Parent" : "Student"}</span>
                    <strong>{teacher ? "Murad Shaheen" : "Adam Shaheen"}</strong>
                </div>
                <div className={styles.contextSection}>
                    <span>Latest note</span>
                    <p>Strong participation this week. Review fractions before Thursday.</p>
                </div>
            </aside>
        </div>
    );
}

export default ChatWorkspace;
