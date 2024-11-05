using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TypingTutor.Domain;

namespace TypingTutor.Infrastructure
{
    public class TypingTutorDbContext : IdentityDbContext<User>
    {
        public TypingTutorDbContext(DbContextOptions<TypingTutorDbContext> options) : base(options) { }

        // Define additional DbSets for other entities
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<UserProgress> UserProgresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<UserProgress>()
                .HasOne(up => up.User)
                .WithMany(u => u.UserProgresses)
                .HasForeignKey(up => up.UserId);

            modelBuilder.Entity<UserProgress>()
                .HasOne(up => up.Lesson)
                .WithMany(l => l.UserProgresses)
                .HasForeignKey(up => up.LessonId);
        }
    }
}
