import { useState } from "react";
import { CreateDeveloper } from "../components/CreateDeveloper";
import { DeveloperList } from "../components/DeveloperList";
import { TaskAssign } from "../components/TaskAssign";
import { getTasksByDeveloper } from "../api/assignments";
import { TaskItem } from "../components/TaskItem";
import type { Task } from "../types/Tasks";

export const LeaderPage = () => {
    const [selectedDevId, setSelectedDevId] = useState<string | null>(null);
    const [devTasks, setDevTasks] = useState<Task[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [assignKey, setAssignKey] = useState(0);

    const refresh = () => {
        setRefreshKey(prev => prev + 1);
        setSelectedDevId(null);
        setDevTasks([]);
    };

    const handleSelectDeveloper = async (devId: string) => {
        setSelectedDevId(devId);
        await loadDevTasks(devId);
    };

    const loadDevTasks = async (devId: string) => {
        const tasks = await getTasksByDeveloper(devId);
        setDevTasks(tasks);
    };

    const refreshDevTasks = async () => {
        if (selectedDevId) {
            await loadDevTasks(selectedDevId);
            setAssignKey(prev => prev + 1);
        }
    };

    return (
        <div style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            minHeight: "100vh",
            backgroundColor: "#16171d"
        }}>
            <h1 style={{ color: "#ffffff", marginBottom: "20px" }}>Team Management</h1>

            <CreateDeveloper onCreated={refresh} />

            <div style={{
                display: "flex",
                gap: "30px",
                marginTop: "20px"
            }}>
                <div style={{
                    flex: "1",
                    minWidth: "300px"
                }}>
                    <DeveloperList
                        key={refreshKey}
                        onSelectDeveloper={handleSelectDeveloper}
                        selectedDevId={selectedDevId}
                    />
                </div>

                <div style={{
                    flex: "1",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "12px",
                    padding: "20px",
                    position: "sticky",
                    top: "20px",
                    height: "fit-content"
                }}>
                    {selectedDevId ? (
                        <>
                            <h3 style={{ color: "#fff", marginBottom: "15px" }}>Assign Tasks</h3>
                            <TaskAssign
                                key={assignKey} 
                                developerId={selectedDevId}
                                onAssigned={refreshDevTasks}
                            />

                            <h3 style={{ color: "#fff", marginTop: "30px", marginBottom: "15px" }}>Assigned Tasks</h3>
                            {devTasks.length === 0 ? (
                                <p style={{ color: "#b3b3b3" }}>No tasks assigned yet.</p>
                            ) : (
                                devTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onTaskChanged={refreshDevTasks}
                                    />
                                ))
                            )}
                        </>
                    ) : (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "200px",
                            color: "#b3b3b3",
                            textAlign: "center"
                        }}>
                            Select a developer from the left<br />to assign tasks
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};