// frontend/src/types/task.ts
export interface Task {
    [x: string]: any;
    id: number;
    title: string;
    status: string;           // open, closed, in-progress
    createdAt: string;
    lastUpdated: string;
    dueDate?: string;         // опционально (может не быть)
    externalId?: string;      // GitHub ID
    updateCount?: number;      // количество обновлений
    storyPoints?: number;      // оценка сложности
    priority?: string;         // High, Medium, Low
    assignee?: string;         // кто назначен
    gitHubUrl?: string;        // ссылка на GitHub
}