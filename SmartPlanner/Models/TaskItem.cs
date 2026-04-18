namespace SmartPlanner.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int StoryPoints { get; set; }

        public Guid? AssigneeId { get; set; }
        public TaskStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
