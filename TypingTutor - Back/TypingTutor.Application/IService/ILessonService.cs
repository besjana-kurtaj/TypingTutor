using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;

namespace TypingTutor.Application.IService
{
    public interface ILessonService
    {
        Task<Lesson> CreateLessonAsync(Lesson lesson);
        Task<Lesson?> GetLessonByIdAsync(int id);
        Task<IEnumerable<Lesson>> GetLessonsByLevelAsync(int levelId);
        Task UpdateLessonAsync(Lesson lesson);      
        Task DeleteLessonAsync(int id);
        Task<IEnumerable<Lesson>> GetAllLessonsAsync();
    }
}
