import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { createChatSocket, getConversationMessages } from "../api/chatApi";
import styles from "../styles/chat.module.css";

function formatTime(value) {
    if (!value) return "";
    return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function PresenceDot({ person }) {
    if (!person.presence) return null;

    const statusLabel = person.presence === "active" ? "Active" : person.presence === "busy" ? "Busy" : "Offline";
    const statusClass = person.presence === "active" ? "presenceActive" : person.presence === "busy" ? "presenceBusy" : "presenceOffline";

    return (
        <span
            className={`${styles.presenceDot} ${styles[statusClass]}`}
            data-status={statusLabel}
            aria-label={`${person.name} is ${statusLabel.toLowerCase()}`}
            title={statusLabel}
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

export function TeacherConversationList({ selectedConversationId, onSelectConversation, searchText, conversations }) {
    const visibleConversations = conversations.filter((conversation) => {
        const value = searchText.trim().toLowerCase();
        return !value || `${conversation.teacher.name} ${conversation.subject}`.toLowerCase().includes(value);
    });

    return (
        <aside className={styles.teacherSidebar} aria-label="Teacher conversations">
            <div className={styles.teacherList}>
                {visibleConversations.map((conversation) => (
                    <Button
                        key={conversation.id}
                        className={`${styles.teacherButton} ${selectedConversationId === conversation.id ? styles.selectedTeacher : ""}`}
                        onClick={() => onSelectConversation(conversation.id)}
                    >
                        <span className={styles.teacherAvatarWrap}>
                            <span className={styles.teacherAvatar}>{getInitials(conversation.teacher.name)}</span>
                            <PresenceDot person={conversation.teacher} />
                        </span>
                        <span className={styles.teacherButtonContent}>
                            <span className={styles.teacherButtonTopline}>
                                <span className={styles.teacherButtonName}>{conversation.teacher.name}</span>
                                <span className={styles.teacherButtonTime}>{formatTime(conversation.lastMessageAt)}</span>
                            </span>
                            <span className={styles.teacherButtonSubject}>{conversation.subject}</span>
                            <span className={styles.teacherButtonPreview}>{conversation.lastMessage}</span>
                        </span>
                    </Button>
                ))}
                {!visibleConversations.length && <div className={styles.noTeachers}>No teacher conversations found.</div>}
            </div>
        </aside>
    );
}

function ChatPage({ selectedConversationId, userId, conversations }) {
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const socketRef = useRef(null);
    const selectedConversation = conversations.find((conversation) => conversation.id === selectedConversationId);

    useEffect(() => {
        if (!selectedConversationId || !userId) return undefined;

        let isCurrentConversation = true;
        const socket = createChatSocket(userId);
        socketRef.current = socket;

        getConversationMessages(selectedConversationId, userId)
            .then((data) => {
                if (isCurrentConversation) setMessages(data.messages);
            })
            .catch((error) => {
                if (isCurrentConversation) setErrorMessage(error.response?.data?.message || "Could not load messages");
            });

        socket.on("connect", () => {
            socket.emit("chat:join", { conversationId: selectedConversationId });
        });

        socket.on("chat:history", (data) => {
            if (data.conversation.id === selectedConversationId && isCurrentConversation) {
                setMessages(data.messages);
            }
        });

        socket.on("chat:message", (message) => {
            if (message.conversationId === selectedConversationId && isCurrentConversation) {
                setMessages((currentMessages) => {
                    if (currentMessages.some((item) => item.id === message.id)) return currentMessages;
                    return [...currentMessages, { ...message, mine: message.senderId === userId }];
                });
            }
        });

        socket.on("chat:error", (data) => {
            if (isCurrentConversation) setErrorMessage(data.message);
        });

        return () => {
            isCurrentConversation = false;
            socketRef.current = null;
            socket.disconnect();
        };
    }, [selectedConversationId, userId]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        const trimmedMessage = messageText.trim();

        if (!trimmedMessage || !selectedConversationId) return;

        if (!socketRef.current?.connected) {
            setErrorMessage("Chat is connecting. Please try again.");
            return;
        }

        socketRef.current.emit("chat:send", {
            conversationId: selectedConversationId,
            body: trimmedMessage,
        });
        setMessageText("");
    };

    if (!selectedConversation) {
        return <section className={styles.conversation}><div className={styles.noTeachers}>Select a teacher conversation.</div></section>;
    }

    return (
        <section className={styles.conversation} aria-label="Conversation">
            <header className={styles.conversationHeader}>
                <span className={styles.teacherAvatarWrap}>
                    <span className={styles.teacherAvatar}>{getInitials(selectedConversation.teacher.name)}</span>
                    <PresenceDot person={selectedConversation.teacher} />
                </span>
                <div className={styles.conversationHeading}>
                    <div className={styles.conversationTitle}>{selectedConversation.teacher.name}</div>
                    <div className={styles.conversationSubtitle}>{selectedConversation.subject}</div>
                </div>
            </header>

            <div className={styles.messageList}>
                <div className={styles.dateDivider}>Conversation</div>
                {messages.map((message) => (
                    <div className={`${styles.messageRow} ${message.mine ? styles.messageMineRow : ""}`} key={message.id}>
                        <article className={`${styles.message} ${message.mine ? styles.messageMine : ""}`}>
                            {!message.mine && <div className={styles.messageSender}>{message.sender}</div>}
                            <div className={styles.messageText}>{message.text}</div>
                            <div className={styles.messageTime}>{formatTime(message.createdAt)}</div>
                        </article>
                    </div>
                ))}
                {!messages.length && <div className={styles.noTeachers}>No messages yet.</div>}
            </div>

            {errorMessage && <div className={styles.noTeachers}>{errorMessage}</div>}
            <form className={styles.messageComposer} onSubmit={handleSendMessage}>
                <input
                    className={styles.messageInput}
                    type="text"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    placeholder="Write a message..."
                    aria-label={`Message ${selectedConversation.teacher.name}`}
                />
                <Button type="submit" variant="contained">Send</Button>
            </form>
        </section>
    );
}

export default ChatPage;
