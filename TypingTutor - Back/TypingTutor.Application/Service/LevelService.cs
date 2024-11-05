using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Application.IRepository;
using TypingTutor.Application.IService;
using TypingTutor.Domain;

namespace TypingTutor.Application.Service
{
    public class LevelService : ILevelService
    {
        private readonly ILevelRepository _levelRepository;

        public LevelService(ILevelRepository levelRepository)
        {
            _levelRepository = levelRepository;
        }

        public async Task<Level> CreateLevelAsync(Level level)
        {
            return await _levelRepository.AddAsync(level);
        }

        public async Task<Level?> GetLevelByIdAsync(int id)
        {
            return await _levelRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Level>> GetAllLevelsAsync()
        {
            return await _levelRepository.GetAllAsync();
        }

        public async Task UpdateLevelAsync(Level level)
        {
            await _levelRepository.UpdateAsync(level);
        }

        public async Task DeleteLevelAsync(int id)
        {
            await _levelRepository.DeleteAsync(id);
        }
    }

}
