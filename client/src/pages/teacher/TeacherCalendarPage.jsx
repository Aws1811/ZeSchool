import AppShell from "../../components/app/AppShell";
import CalendarBoard from "../../components/app/CalendarBoard";

function TeacherCalendarPage() {
    return (
        <AppShell role="teacher" title="Calendar">
            <CalendarBoard teacher />
        </AppShell>
    );
}

export default TeacherCalendarPage;
