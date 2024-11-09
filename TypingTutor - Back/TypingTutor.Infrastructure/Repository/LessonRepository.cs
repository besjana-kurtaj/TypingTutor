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
    public class LessonRepository : Repository<Lesson>, ILessonRepository
    {
        public LessonRepository(TypingTutorDbContext context) : base(context) { }

        public async Task<IEnumerable<Lesson>> GetLessonsByLevelAsync(int levelId)
        {
            return null;
        }
    }
}
