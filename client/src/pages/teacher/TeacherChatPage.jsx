import AppShell from "../../components/app/AppShell";
import ChatWorkspace from "../../components/app/ChatWorkspace";

function TeacherChatPage() {
    return (
        <AppShell role="teacher" title="Chat">
            <ChatWorkspace role="teacher" />
        </AppShell>
    );
}

export default TeacherChatPage;
