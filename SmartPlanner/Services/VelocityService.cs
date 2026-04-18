using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public class VelocityService
    {
        public double CalculateSprintVelocity(List<TaskItem> tasks, int days = 14)
        {
            var since = DateTime.UtcNow.AddDays(-days);

            return tasks
                .Where(t => t.CompletedAt >= since)
                .Sum(t => t.StoryPoints);
        }
    }
}
