import { useState } from "react";
import { createDeveloper } from "../api/developers";

export const CreateDeveloper = ({ onCreated }: { onCreated: () => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createDeveloper(name, email, password);
            setName("");
            setEmail("");
            setPassword("");
            onCreated();
        } catch (error) {
            console.error("Failed to create developer:", error);
            setError("Failed to create developer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            backgroundColor: "#2d2d2d",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
        }}>
            <h3 style={{ color: "#fff", marginBottom: "15px" }}>+Create Developer</h3>

            {error && (
                <div style={{ color: "#f44336", marginBottom: "10px", padding: "8px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
                    {error}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff",
                        boxSizing: "border-box"
                    }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff",
                        boxSizing: "border-box"
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff",
                        boxSizing: "border-box"
                    }}
                />
                <button
                    onClick={submit}
                    disabled={loading}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#c084fc",
                        color: "#16171d",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Creating..." : "Create Developer"}
                </button>
            </div>
        </div>
    );
};