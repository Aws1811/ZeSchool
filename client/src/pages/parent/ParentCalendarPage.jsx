import AppShell from "../../components/app/AppShell";
import ChildSelector from "../../components/app/ChildSelector";
import CalendarBoard from "../../components/app/CalendarBoard";

function ParentCalendarPage() {
    return (
        <AppShell role="parent" title="Calendar" topAction={<ChildSelector />}>
            <CalendarBoard />
        </AppShell>
    );
}

export default ParentCalendarPage;
