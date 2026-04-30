import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { LeaderPage } from "./pages/LeaderPage";
import { DeveloperPage } from "./pages/DeveloperPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
        setLoading(false);
    }, []);

    const isLeader = user?.role === "Leader";
    const isDeveloper = user?.role === "Developer";
    const isAuthenticated = !!token && !!user;

    const ProtectedRoute = ({ 
        children, 
        allowedRoles 
    }: { 
        children: React.ReactNode; 
        allowedRoles: string[];
    }) => {
        if (!isAuthenticated) {
            return <Navigate to="/" replace />;
        }
        if (!allowedRoles.includes(user?.role)) {
            if (user?.role === "Leader") {
                return <Navigate to="/leader" replace />;
            }
            if (user?.role === "Developer") {
                return <Navigate to="/dev" replace />;
            }
            return <Navigate to="/" replace />;
        }
        return <>{children}</>;
    };

    const PublicRoute = ({ children }: { children: React.ReactNode }) => {
        if (isAuthenticated) {
            if (isLeader) {
                return <Navigate to="/leader" replace />;
            }
            if (isDeveloper) {
                return <Navigate to="/dev" replace />;
            }
        }
        return <>{children}</>;
    };

    if (loading) {
        return (
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh",
                backgroundColor: "#16171d",
                color: "#fff"
            }}>
                Loading...
            </div>
        );
    }

    return (
        <BrowserRouter>
            {isAuthenticated && (
                <nav style={{
                    display: "flex",
                    gap: "20px",
                    padding: "15px 20px",
                    backgroundColor: "#2d2d2d",
                    borderBottom: "1px solid #444"
                }}>
                    {isLeader && (
                        <>
                            <Link to="/leader" style={{ color: "#c084fc", textDecoration: "none" }}>
                                Team Management
                            </Link>
                            <Link to="/tasks" style={{ color: "#c084fc", textDecoration: "none" }}>
                                Tasks
                            </Link>
                        </>
                    )}

                    {isDeveloper && (
                        <Link to="/dev" style={{ color: "#c084fc", textDecoration: "none" }}>
                            My Tasks
                        </Link>
                    )}
                    
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}
                        style={{
                            marginLeft: "auto",
                            padding: "5px 10px",
                            backgroundColor: "#f44336",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                </nav>
            )}

            <Routes>
                <Route 
                    path="/" 
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    } 
                />
                
                <Route 
                    path="/leader" 
                    element={
                        <ProtectedRoute allowedRoles={["Leader"]}>
                            <LeaderPage />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/tasks" 
                    element={
                        <ProtectedRoute allowedRoles={["Leader"]}>
                            <TasksPage />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/dev" 
                    element={
                        <ProtectedRoute allowedRoles={["Leader", "Developer"]}>
                            <DeveloperPage />
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="/developers" element={<Navigate to="/leader" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;