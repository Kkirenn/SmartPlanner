using Microsoft.EntityFrameworkCore;
using SmartPlanner.Data;

namespace SmartPlanner.Services
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly AppDbContext _db;
        private readonly EtaService _etaService;
        private readonly VelocityService _velocity;

        public AnalyticsService(AppDbContext db, EtaService etaService, VelocityService velocity)
        {
            _db = db;
            _etaService = etaService;
            _velocity = velocity;
        }

        public async Task<double> GetEta(Guid taskId)
        {
            var task = await _db.Tasks.FindAsync(taskId);
            var history = await _db.Tasks.ToListAsync();

            return _etaService.Calculate(history, task.StoryPoints);
        }
        public async Task<double> GetVelocityAsync()
        {
            var tasks = await _db.Tasks.ToListAsync();
            return _velocity.CalculateSprintVelocity(tasks);
        }
    }
}
