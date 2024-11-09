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
    public class LevelRepository : Repository<Level>, ILevelRepository
    {
        public LevelRepository(TypingTutorDbContext context) : base(context) { }

        public async Task<Level> GetNextLevelAsync(int currentId)
        {
            return await _context.Levels
                .Where(level => level.LevelId > currentId)    
                .OrderBy(level => level.LevelId)              
                .FirstOrDefaultAsync();                  
        }
    }
}
