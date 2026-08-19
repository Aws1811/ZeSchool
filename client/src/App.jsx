import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChildSetupPage from "./pages/ChildSetupPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
