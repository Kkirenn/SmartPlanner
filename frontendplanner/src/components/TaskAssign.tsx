import { useState, useEffect } from "react";
import { getUnassignedTasks, assignTaskToDeveloper } from "../api/assignments";
import type { Task } from "../types/Tasks";


export const TaskAssign = ({ developerId, onAssigned }: { developerId: string; onAssigned: () => void }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUnassignedTasks();
    }, []);

    const loadUnassignedTasks = async () => {
        try {
            const data = await getUnassignedTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load unassigned tasks:", error);
        }
    };

    const assign = async () => {
        if (!selectedTask) return;

        setLoading(true);
        try {
            await assignTaskToDeveloper(selectedTask, developerId);
            setSelectedTask("");
            await loadUnassignedTasks();
            onAssigned();
        } catch (error) {
            console.error("Failed to assign task:", error);
        } finally {
            setLoading(false);
        }
    };

    if (tasks.length === 0) {
        return <p style={{ color: "#b3b3b3" }}>No unassigned tasks available.</p>;
    }

    return (
        <div style={{ marginTop: "15px" }}>
            <select
                value={selectedTask}
                onChange={e => setSelectedTask(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    backgroundColor: "#3d3d3d",
                    color: "#fff",
                    marginBottom: "10px"
                }}
            >
                <option value="">Select a task to assign</option>
                {tasks.map(task => (
                    <option key={task.id} value={task.id}>
                        {task.title} (SP: {task.storyPoints})
                    </option>
                ))}
            </select>
            <button
                onClick={assign}
                disabled={!selectedTask || loading}
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
                {loading ? "Assigning..." : "Assign Task"}
            </button>
        </div>
    );
};