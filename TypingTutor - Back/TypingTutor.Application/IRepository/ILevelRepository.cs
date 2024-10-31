using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;

namespace TypingTutor.Application.IRepository
{
    public interface ILevelRepository
    {
        Task<IEnumerable<Level>> GetAllLevelsAsync();
        Task<Level> GetLevelByIdAsync(int levelId);
        Task AddLevelAsync(Level level);
    }
}
