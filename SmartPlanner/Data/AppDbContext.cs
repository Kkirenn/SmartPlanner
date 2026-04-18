using Microsoft.EntityFrameworkCore;
using SmartPlanner.Models;
using System.Collections.Generic;

namespace SmartPlanner.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
        public DbSet<Developer> Developers => Set<Developer>();
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
