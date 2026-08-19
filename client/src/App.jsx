import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChildSetupPage from "./pages/ChildSetupPage/ChildSetupPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register/children" element={<ChildSetupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
