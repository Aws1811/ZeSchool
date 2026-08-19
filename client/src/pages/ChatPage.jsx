import { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "../styles/dashboard.module.css";

const teachers = [
    { id: "teacher-1", name: "Teacher 1", subject: "Class teacher" },
    { id: "teacher-2", name: "Teacher 2", subject: "Subject teacher" },
];

const initialMessages = {
    "teacher-1": [
        {
            sender: "Teacher 1",
            text: "This conversation is ready for parent and teacher messages.",
        },
    ],
    "teacher-2": [
        {
            sender: "Teacher 2",
            text: "This is a placeholder conversation for the selected child.",
        },
    ],
};

function ChatPage({ selectedChild }) {
    const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0].id);
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState(initialMessages);
    const selectedTeacher = teachers.find((teacher) => teacher.id === selectedTeacherId);
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
                { sender: "Parent", text: trimmedMessage },
            ],
        }));
        setMessageText("");
    };

    return (
        <div className={styles.chatWorkspace}>
            <aside className={styles.teacherSidebar} aria-label="Teachers">
                <div className={styles.teacherSidebarTitle}>Teachers</div>
                <div className={styles.teacherList}>
                    {teachers.map((teacher) => (
                        <Button
                            key={teacher.id}
                            className={`${styles.teacherButton} ${selectedTeacherId === teacher.id ? styles.selectedTeacher : ""}`}
                            onClick={() => setSelectedTeacherId(teacher.id)}
                        >
                            <span className={styles.teacherButtonName}>{teacher.name}</span>
                            <span className={styles.teacherButtonSubject}>{teacher.subject}</span>
                        </Button>
                    ))}
                </div>
            </aside>

            <section className={styles.conversation}>
                <div className={styles.conversationHeader}>
                    <div>
                        <div className={styles.conversationTitle}>{selectedTeacher.name}</div>
                        <div className={styles.conversationSubtitle}>
                            {selectedTeacher.subject} for {selectedChild.name}
                        </div>
                    </div>
                </div>

                <div className={styles.messageList}>
                    {selectedMessages.map((message, index) => (
                        <article className={styles.message} key={`${message.sender}-${index}`}>
                            <div className={styles.messageSender}>{message.sender}</div>
                            <div className={styles.messageText}>{message.text}</div>
                        </article>
                    ))}
                </div>

                <form className={styles.messageComposer} onSubmit={handleSendMessage}>
                    <TextField
                        fullWidth
                        size="small"
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                        placeholder={`Message ${selectedTeacher.name}`}
                        aria-label={`Message ${selectedTeacher.name}`}
                    />
                    <Button type="submit" variant="contained">
                        Send
                    </Button>
                </form>
            </section>
        </div>
    );
}

export default ChatPage;
