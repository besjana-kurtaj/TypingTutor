using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Application.Dto;
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
        public async Task<UserProgressSummaryDto> GetCurrentProgressAsync(string userId)
        {
            var userProgressData = _context.UserProgresses
                .Where(up => up.UserId == userId);

            // Calculate average and max values
            var summary = await userProgressData
                .GroupBy(up => up.UserId)
                .Select(g => new UserProgressSummaryDto
                {
                    AverageSpeed = g.Average(up => up.Speed),
                    AverageAccuracy = g.Average(up => up.Accuracy),
                    AverageErrors = g.Average(up => up.Errors),
                    MaxLevel = g.Max(up => up.LevelId)
                })
                .FirstOrDefaultAsync();

            return summary;
        }
        public async Task<List<UserProgressDto>> GetAllUsersPerformanceHistoryAsync()
        {
            return await _context.UserProgresses
                .Include(up => up.User).Include(x=>x.Level) 
                .OrderByDescending(up => up.CompletionDate)
                .Select(up => new UserProgressDto
                {
                    UserId = up.UserId,
                    UserName = up.User.UserName, 
                    LevelId = up.Level.LevelNumber,
                    Speed = up.Speed,
                    Accuracy = up.Accuracy,
                    Errors = up.Errors,
                    CompletionDate = up.CompletionDate
                })
                .ToListAsync();
        }
        public async Task<UserStatisticsDto> GetOverallUserStatisticsAsync()
        {
            var userProgressData = _context.UserProgresses;

            var statistics = await userProgressData
                .GroupBy(up => 1) 
                .Select(g => new UserStatisticsDto
                {
                    AverageSpeed = g.Average(up => up.Speed),
                    AverageAccuracy = g.Average(up => up.Accuracy),
                    AverageErrors = g.Average(up => up.Errors),
                    MaxLevel = g.Max(up => up.LevelId)
                })
                .FirstOrDefaultAsync();

            return statistics;
        }


        public async Task<List<UserProgress>> GetPerformanceHistoryAsync(string userId)
        {
            return await _context.UserProgresses
                .Where(up => up.UserId == userId)
                .OrderByDescending(up => up.CompletionDate)
                .ToListAsync();
        }
    }
}
