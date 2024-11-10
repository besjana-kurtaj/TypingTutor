using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Application.Dto;
using TypingTutor.Domain;

namespace TypingTutor.Application.IRepository
{
    public interface IUserProgressRepository : IRepository<UserProgress>
    {
        Task<IEnumerable<UserProgress>> GetProgressByUserIdAsync(string userId);
        Task<UserProgressSummaryDto> GetCurrentProgressAsync(string userId);
        Task<List<UserProgress>> GetPerformanceHistoryAsync(string userId);
        Task<UserStatisticsDto> GetOverallUserStatisticsAsync();
        Task<List<UserProgressDto>> GetAllUsersPerformanceHistoryAsync();


    }
}
