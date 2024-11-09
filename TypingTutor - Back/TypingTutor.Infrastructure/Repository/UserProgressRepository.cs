using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Application.IRepository;
using TypingTutor.Domain;

namespace TypingTutor.Infrastructure.Repository
{
    public class UserProgressRepository : Repository<UserProgress>, IUserProgressRepository
    {
        public UserProgressRepository(TypingTutorDbContext context) : base(context) { }

        public async Task<IEnumerable<UserProgress>> GetProgressByUserIdAsync(string userId)
        {
            return await _context.UserProgresses
                                 .Include(up => up.Level)
                                 .Where(up => up.UserId == userId)
                                 .ToListAsync();
        }
    }
}
