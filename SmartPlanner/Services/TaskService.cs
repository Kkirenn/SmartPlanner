using Microsoft.EntityFrameworkCore;
using SmartPlanner.Data;
using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _db;

        public TaskService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Guid> Create(string title, int storyPoints)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = title,
                StoryPoints = storyPoints,
                CreatedAt = DateTime.UtcNow
            };

            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();

            return task.Id;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null) { return false; }

            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync(true);
            return true;
        }

        public async Task<List<TaskItem>> GetAll()
        {
            return await _db.Tasks.ToListAsync();
        }
    }
}
