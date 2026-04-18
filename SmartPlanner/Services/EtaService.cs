using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public class EtaService
    {
        public double Calculate(List<TaskItem> history, int storyPoints)
        {
            var completed = history
                .Where(t => t.CompletedAt.HasValue)
                .ToList();

            if (!completed.Any())
                return storyPoints * 2; // fallback

            var avgPerPoint = completed.Average(t =>
                (t.CompletedAt.Value - t.CreatedAt).TotalHours / t.StoryPoints
            );

            return avgPerPoint * storyPoints;
        }
    }
}
