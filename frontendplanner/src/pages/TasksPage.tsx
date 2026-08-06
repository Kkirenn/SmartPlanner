import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";
import type { Task } from "../types/Tasks";
import { TaskItem } from "../components/TaskItem";
import { CreateTaskForm } from "../components/CreateTaskForm";

export const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const load = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={{
            padding: '20px',
            minHeight: '100vh',
            backgroundColor: '#16171d',
            color: '#e0e0e0'
        }}>
            <h1 style={{ color: '#ffffff' }}>Smart Planner</h1>

            <CreateTaskForm onCreated={load} />

            <h2 style={{ color: '#ffffff', marginTop: '20px' }}>Tasks</h2>
            {tasks.map(t => (
                <TaskItem
                    key={t.id}
                    task={t}
                    onTaskChanged={load}
                />
            ))}
        </div>
    );
};