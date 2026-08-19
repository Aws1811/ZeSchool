import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChildSetupPage from "./pages/ChildSetupPage";

import ParentChatPage from "./pages/parent/ParentChatPage";
import ParentCalendarPage from "./pages/parent/ParentCalendarPage";
import ParentGradesPage from "./pages/parent/ParentGradesPage";
import ParentAttendancePage from "./pages/parent/ParentAttendancePage";
import ParentReportsPage from "./pages/parent/ParentReportsPage";
import ParentBusPage from "./pages/parent/ParentBusPage";
import ParentAIPage from "./pages/parent/ParentAIPage";

import TeacherChatPage from "./pages/teacher/TeacherChatPage";
import TeacherCalendarPage from "./pages/teacher/TeacherCalendarPage";
import TeacherGradesPage from "./pages/teacher/TeacherGradesPage";
import TeacherAttendancePage from "./pages/teacher/TeacherAttendancePage";
import TeacherReportsPage from "./pages/teacher/TeacherReportsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register/children" element={<ChildSetupPage />} />

                <Route path="/parent" element={<Navigate to="/parent/chat" replace />} />
                <Route path="/parent/chat" element={<ParentChatPage />} />
                <Route path="/parent/calendar" element={<ParentCalendarPage />} />
                <Route path="/parent/grades" element={<ParentGradesPage />} />
                <Route path="/parent/attendance" element={<ParentAttendancePage />} />
                <Route path="/parent/reports" element={<ParentReportsPage />} />
                <Route path="/parent/bus" element={<ParentBusPage />} />
                <Route path="/parent/ai" element={<ParentAIPage />} />

                <Route path="/teacher" element={<Navigate to="/teacher/chat" replace />} />
                <Route path="/teacher/chat" element={<TeacherChatPage />} />
                <Route path="/teacher/calendar" element={<TeacherCalendarPage />} />
                <Route path="/teacher/grades" element={<TeacherGradesPage />} />
                <Route path="/teacher/attendance" element={<TeacherAttendancePage />} />
                <Route path="/teacher/reports" element={<TeacherReportsPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
