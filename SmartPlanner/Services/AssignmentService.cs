using Microsoft.EntityFrameworkCore;
using SmartPlanner.Data;
using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly AppDbContext _db;

        public AssignmentService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<bool> AssignToDeveloperAsync(Guid taskId, Guid devId, Guid leaderId)
        {
            var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.CreatedByLeaderId == leaderId);

            if (task == null)
                return false;

            var developer = await _db.Developers.FirstOrDefaultAsync(d => d.Id == devId && d.CreatedByLeaderId == leaderId);

            if (developer == null)
                return false;

            task.AssigneeId = devId;
            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByDeveloperAsync(Guid devId)
        {
            return await _db.Tasks.Where(t => t.AssigneeId == devId).ToListAsync();
        }
        public async Task<IEnumerable<TaskItem>> GetUnassignedTasksAsync()
        {
            return await _db.Tasks
                .Where(t => t.AssigneeId == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetUnassignedTasksAsync(Guid leaderId)
        {
            return await _db.Tasks
                .Where(t => t.AssigneeId == null && t.CreatedByLeaderId == leaderId)
                .ToListAsync();
        }

        public async Task<bool> UnassignTaskAsync(Guid taskId)
        {
            var task = await _db.Tasks.FindAsync(taskId);
            if (task == null) return false;

            task.AssigneeId = null;
            await _db.SaveChangesAsync();

            return true;
        }
    }
}
