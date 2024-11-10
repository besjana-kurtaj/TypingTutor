using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;

namespace TypingTutor.Application.IService
{
    public interface ILevelService
    {
        Task<Level> CreateLevelAsync(Level level);
        Task<Level?> GetLevelByIdAsync(int id);
        Task<IEnumerable<Level>> GetAllLevelsAsync();
        Task UpdateLevelAsync(Level level);
        Task DeleteLevelAsync(int id);
        Task GetNextLevelAsync(int levelNumber);
    }
}
