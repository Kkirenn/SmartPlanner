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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Developer>()
                .HasOne(d => d.CreatedByLeader)
                .WithMany()
                .HasForeignKey(d => d.CreatedByLeaderId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.CreatedByLeader)
                .WithMany()
                .HasForeignKey(t => t.CreatedByLeaderId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
