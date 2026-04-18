namespace SmartPlanner.Models
{
    public class Developer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public int CurrentLoad { get; set; }
        public UserRole Role { get; set; } 

    }
}
