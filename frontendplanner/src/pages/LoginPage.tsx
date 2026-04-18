import { useState } from "react";
import { api } from "../api/client";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", { email, password });
            const { token } = response.data;

            localStorage.setItem("token", token);

            const payload = JSON.parse(atob(token.split(".")[1]));

            const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

            console.log("Role from token:", role);  
            console.log("UserId from token:", userId);

            const user = {
                id: userId,
                email: email,
                role: role  
            };
            localStorage.setItem("user", JSON.stringify(user));

            console.log("Saved user:", user);  

            if (role === "Leader") {
                window.location.href = "/leader";
            } else {
                window.location.href = "/dev";
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#16171d"
        }}>
            <form onSubmit={handleSubmit} style={{
                backgroundColor: "#2d2d2d",
                padding: "30px",
                borderRadius: "12px",
                width: "320px"
            }}>
                <h2 style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>Login</h2>

                {error && (
                    <div style={{ color: "#f44336", marginBottom: "10px", textAlign: "center" }}>
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff",
                        boxSizing: "border-box"
                    }}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff",
                        boxSizing: "border-box"
                    }}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#c084fc",
                        color: "#16171d",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Loading..." : "Login"}
                </button>

                <div style={{ marginTop: "15px", fontSize: "12px", color: "#666", textAlign: "center" }}>
                    <p>Test accounts:</p>
                    <p>lead@test.com / 123 (Leader)</p>
                    <p>dev@test.com / 123 (Developer)</p>
                </div>
            </form>
        </div>
    );
};