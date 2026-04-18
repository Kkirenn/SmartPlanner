using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAll();
        Task<Guid> Create(string title, int storyPoints);
        Task<bool> DeleteAsync(Guid id);
    }
}
