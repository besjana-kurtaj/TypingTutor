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
    public class LevelRepository : Repository<Level>, ILevelRepository
    {
        public LevelRepository(TypingTutorDbContext context) : base(context) { }

        public async Task<LevelDto> GetNextLevelAsync(int levelNumber)
        {
            try
            {
                var level = await _context.Levels
       .Where(l => l.LevelNumber > levelNumber)
       .OrderBy(l => l.LevelNumber)
       .FirstOrDefaultAsync();

                if (level == null) return null;

                return new LevelDto
                {
                    LevelId=level.LevelId,
                    LevelNumber = level.LevelNumber,
                    Name = level.Name,
                    Description = level.Description,
                    Difficulty = level.Difficulty,
                    TimeLimitInSeconds = level.TimeLimitInSeconds
                };
            }
            catch (Exception ex)
            {
                return null;
            }
          
        }
    }
}
