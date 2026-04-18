import { useEffect, useState } from "react";
import { getDevelopers, type Developer } from "../api/developers";

export const DeveloperList = ({
    onSelectDeveloper,
    selectedDevId,
    refreshTrigger
}: {
    onSelectDeveloper?: (id: string) => void;
    selectedDevId?: string | null;
    refreshTrigger?: number;
}) => {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDevelopers();
    }, [refreshTrigger]);

    const loadDevelopers = async () => {
        try {
            const data = await getDevelopers();
            setDevelopers(data);
        } catch (error) {
            console.error("Failed to load developers:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading developers...</div>;

    const getRoleName = (role: number): string => {
        return role === 1 ? "Leader" : "Developer";
    };

    const getRoleColor = (role: number): string => {
        return role === 1 ? "#ff9800" : "#4caf50";
    };

    return (
        <div>
            <h3 style={{ color: "#fff", marginBottom: "15px" }}>Developers</h3>
            {developers.length === 0 ? (
                <p style={{ color: "#b3b3b3" }}>No developers yet. Create one!</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {developers.map(dev => (
                        <div
                            key={dev.id}
                            onClick={() => onSelectDeveloper?.(dev.id)}
                            style={{
                                backgroundColor: selectedDevId === dev.id ? "#c084fc" : "#2d2d2d",
                                padding: "12px 15px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                border: selectedDevId === dev.id ? "1px solid #c084fc" : "1px solid #444",
                                transition: "all 0.2s"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <strong style={{ color: selectedDevId === dev.id ? "#16171d" : "#fff" }}>
                                        {dev.name}
                                    </strong>
                                    <div style={{ fontSize: "12px", color: selectedDevId === dev.id ? "#16171d" : "#b3b3b3" }}>
                                        {dev.email}
                                    </div>
                                </div>
                                <span style={{
                                    backgroundColor: getRoleColor(dev.role),
                                    color: "#fff",
                                    padding: "2px 8px",
                                    borderRadius: "12px",
                                    fontSize: "11px"
                                }}>
                                    {getRoleName(dev.role)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};