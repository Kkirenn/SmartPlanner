import { useState } from "react";
import { createTask } from "../api/tasks";

export const CreateTaskForm = ({ onCreated }: { onCreated: () => void }) => {
    const [title, setTitle] = useState("");
    const [storyPoints, setStoryPoints] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createTask({ title, storyPoints });
            setTitle("");
            setStoryPoints(1);
            onCreated();
        } catch (err: any) {
            console.error("Error:", err);
            setError(err.message || "Failed to create task");
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
            <h3 style={{ color: "#fff", marginBottom: "15px" }}>+Create Task</h3>

            {error && (
                <div style={{ color: "#f44336", marginBottom: "10px", padding: "8px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
                    {error}
                </div>
            )}

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                    placeholder="Task title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{
                        flex: 3,
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff"
                    }}
                />

                <input
                    type="number"
                    placeholder="SP"
                    value={storyPoints}
                    onChange={e => setStoryPoints(Number(e.target.value))}
                    min="1"
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#3d3d3d",
                        color: "#fff",
                        textAlign: "center"
                    }}
                />

                <button
                    onClick={submit}
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#c084fc",
                        color: "#16171d",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "..." : "Create"}
                </button>
            </div>
        </div>
    );
};