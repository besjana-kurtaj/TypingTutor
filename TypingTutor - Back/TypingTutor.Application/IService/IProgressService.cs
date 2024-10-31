using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;

namespace TypingTutor.Application.IService
{
    public interface IProgressService
    {
        Task<UserProgress> GetProgressAsync(int userId, int levelId);
        Task UpdateProgressAsync(int userId, int levelId, bool completed);
    }
}
