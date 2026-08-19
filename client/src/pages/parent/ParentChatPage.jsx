import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import ChatWorkspace from "../../components/app/ChatWorkspace";

function ParentChatPage() {
    return (
        <AppShell role="parent" title="Chat" topAction={<ChildSelector />}>
            <ChatWorkspace role="parent" />
        </AppShell>
    );
}

export default ParentChatPage;
