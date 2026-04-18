namespace SmartPlanner.Services
{
    public interface IAnalyticsService
    {
        Task<double> GetEta(Guid taskId);
        Task<double> GetVelocityAsync();
    }
}
