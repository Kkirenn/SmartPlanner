using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public interface IDeveloperService
    {
        Task<Developer> CreateAsync(string name, string email, string password, UserRole role, Guid? createdByLeaderId = null);
        Task<List<Developer>> GetAllAsync();
        Task<Developer?> GetByIdAsync(Guid id);
        Task<List<Developer>> GetByLeaderIdAsync(Guid leaderId);
    }
}
