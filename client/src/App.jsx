import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ChildSetupPage from "./pages/ChildSetupPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ParentDashboardPage from "./pages/ParentDashboardPage";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute role="parent">
                            <ParentDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/teacher-dashboard"
                    element={
                        <ProtectedRoute role="teacher">
                            <TeacherDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register/children" element={<ChildSetupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
