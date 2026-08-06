import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Task {
    id: string;
    title: string;
    status: string;
    storyPoints?: number;
}

export const DeveloperPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (hasLoaded) return;

        const loadTasks = async () => {
            const userStr = localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : null;

            if (!user?.id) {
                setError("User not found");
                setLoading(false);
                return;
            }

            try {
                const res = await api.get(`/assignment/my`);
                setTasks(res.data);
                setHasLoaded(true);
            } catch (err: any) {
                console.error("Failed to load tasks:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [hasLoaded]);

    if (loading) {
        return <div style={{ padding: "20px", color: "#fff" }}>Loading tasks...</div>;
    }

    if (error) {
        return <div style={{ padding: "20px", color: "#f44336" }}>Error: {error}</div>;
    }

    return (
        <div style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            minHeight: "100vh",
            backgroundColor: "#16171d",
            color: "#e0e0e0"
        }}>
            <h1 style={{ color: "#ffffff", marginBottom: "20px" }}>My Tasks</h1>

            {tasks.length === 0 ? (
                <p style={{ color: "#b3b3b3" }}>No tasks assigned yet.</p>
            ) : (
                tasks.map(task => (
                    <div key={task.id} style={{
                        border: "1px solid #444",
                        borderRadius: "8px",
                        padding: "12px 15px",
                        marginBottom: "10px",
                        backgroundColor: "#2d2d2d"
                    }}>
                        <strong style={{ color: "#fff" }}>{task.title}</strong>
                        <div style={{ fontSize: "13px", color: "#b3b3b3", marginTop: "5px" }}>
                            Status: {task.status} | SP: {task.storyPoints || 0}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};