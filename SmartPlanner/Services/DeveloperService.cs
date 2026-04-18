using Microsoft.EntityFrameworkCore;
using SmartPlanner.Data;
using SmartPlanner.Models;

namespace SmartPlanner.Services
{
    public class DeveloperService : IDeveloperService
    {
        private readonly AppDbContext _db;

        public DeveloperService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Developer> CreateAsync(string name, string email, string password, UserRole role)
        {
            var developer = new Developer
            {
                Id = Guid.NewGuid(),
                Name = name,
                Email = email,
                Password = password,
                Role = role
            };

            _db.Developers.Add(developer);
            await _db.SaveChangesAsync();
            return developer;
        }

        public async Task<List<Developer>> GetAllAsync()
        {
            return await _db.Developers.ToListAsync();
        }

        public async Task<Developer?> GetByIdAsync(Guid id)
        {
            return await _db.Developers.FindAsync(id);
        }
    }
}
