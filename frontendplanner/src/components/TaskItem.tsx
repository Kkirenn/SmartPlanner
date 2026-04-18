import { useState } from "react";
import type { Task } from "../types/Tasks";
import {
    FaIdCard,
    FaGithub,
    FaCalendarAlt,
    FaSyncAlt,
    FaChartLine,
    FaUser
} from 'react-icons/fa';
import { MdPriorityHigh, MdBrightnessMedium, MdBrightnessLow } from 'react-icons/md';
import { api } from "../api/client";

export const TaskItem = ({ task, onTaskChanged }: { task: Task; onTaskChanged?: () => void }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUnassigning, setIsUnassigning] = useState(false);


    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const isLeader = user?.role === "Leader";

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return '#4caf50';
            case 'closed': return '#757575';
            case 'in-progress': return '#ff9800';
            default: return '#2196f3';
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Delete task "${task.title}"? This action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            await api.delete(`/tasks/${task.id}`);
            onTaskChanged?.();
        } catch (error) {
            console.error("Failed to delete task:", error);
            alert("Failed to delete task");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUnassign = async () => {
        if (!confirm(`Remove assignment from task "${task.title}"?`)) return;

        setIsUnassigning(true);
        try {
            await api.post(`/assignment/${task.id}/unassign`);
            onTaskChanged?.();
        } catch (error) {
            console.error("Failed to unassign task:", error);
            alert("Failed to unassign task");
        } finally {
            setIsUnassigning(false);
        }
    };

    const getPriorityIcon = (priority?: string) => {
        switch (priority) {
            case 'High': return <MdPriorityHigh color="#f44336" />;
            case 'Medium': return <MdBrightnessMedium color="#ff9800" />;
            case 'Low': return <MdBrightnessLow color="#4caf50" />;
            default: return null;
        }
    };

    return (
        <div style={{
            border: "1px solid #444",
            padding: "12px 15px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: '#2d2d2d',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '16px', color: '#ffffff' }}>{task.title}</strong>

                    <span style={{
                        backgroundColor: '#c084fc',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#16171d'
                    }}>
                        {task.storyPoints ?? 0}
                    </span>
                </div>

                <div style={{
                    backgroundColor: getStatusColor(task.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {task.status}
                </div>
            </div>

            <div style={{ fontSize: '13px', color: '#b3b3b3', marginTop: '8px' }}>
                <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaIdCard size={12} /> ID: {task.id}
                </div>

                {task.externalId && (
                    <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaGithub size={12} /> GitHub ID: {task.externalId}
                    </div>
                )}

                {task.dueDate && (
                    <div style={{
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: new Date(task.dueDate) < new Date() ? '#f44336' : '#b3b3b3'
                    }}>
                        <FaCalendarAlt size={12} /> Due: {formatDate(task.dueDate)}
                        {new Date(task.dueDate) < new Date() && task.status !== 'closed' && ' (OVERDUE)'}
                    </div>
                )}

                <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaCalendarAlt size={12} /> Created: {formatDate(task.createdAt)}
                </div>

                <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaSyncAlt size={12} /> Updated: {formatDate(task.lastUpdated)}
                </div>

                {task.updateCount && task.updateCount > 1 && (
                    <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaChartLine size={12} /> Updates: {task.updateCount}
                    </div>
                )}

                {task.priority && (
                    <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {getPriorityIcon(task.priority)} Priority: {task.priority}
                    </div>
                )}

                {task.assignee && (
                    <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaUser size={12} /> Assignee: {task.assignee}
                    </div>
                )}

                {isLeader && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                        
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#f44336',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>

                        {task.assigneeId && (
                            <button
                                onClick={handleUnassign}
                                disabled={isUnassigning}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: '#ff9800',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                {isUnassigning ? 'Unassigning...' : 'Unassign'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};