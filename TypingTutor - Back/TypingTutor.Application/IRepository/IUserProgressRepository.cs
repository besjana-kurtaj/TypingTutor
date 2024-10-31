using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;

namespace TypingTutor.Application.IRepository
{
    public interface IUserProgressRepository
    {
        Task<UserProgress> GetProgressByUserIdAndLevelIdAsync(int userId, int levelId);
        Task AddProgressAsync(UserProgress progress);
        Task UpdateProgressAsync(UserProgress progress);
    }
}
