using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public interface IAssignmentService
    {
        Task<IEnumerable<TaskItem>> GetTasksByDeveloperAsync(Guid devId);
        Task<bool> AssignToDeveloperAsync(Guid taskId, Guid devId, Guid leaderId);
        Task<bool> UnassignTaskAsync(Guid taskId);
        Task<IEnumerable<TaskItem>> GetUnassignedTasksAsync(Guid leaderId);
    }
}
