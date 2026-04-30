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

        public async Task<Guid> Create(string title, int storyPoints, Guid? createdByLeaderId = null)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = title,
                StoryPoints = storyPoints,
                CreatedAt = DateTime.UtcNow,
                CreatedByLeaderId = createdByLeaderId
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

        public async Task<List<TaskItem>> GetByLeaderIdAsync(Guid leaderId)
        {
            return await _db.Tasks
                .Where(t => t.CreatedByLeaderId == leaderId)
                .ToListAsync();
        }
    }
}
