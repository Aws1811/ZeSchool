import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const savedUser = localStorage.getItem("zeschoolUser");

    if (!savedUser) {
        return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(savedUser);

    if (role && user.role !== role) {
        return <Navigate to={user.role === "teacher" ? "/teacher-dashboard" : "/dashboard"} replace />;
    }

    return children;
}

export default ProtectedRoute;
