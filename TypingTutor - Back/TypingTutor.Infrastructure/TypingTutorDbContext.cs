using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;
using Microsoft.EntityFrameworkCore;


namespace TypingTutor.Infrastructure
{
    public class TypingTutorDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<UserProgress> UserProgresses { get; set; }

        public TypingTutorDbContext(DbContextOptions<TypingTutorDbContext> options) : base(options) { }
    }

}
