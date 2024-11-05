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
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;

        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public async Task<Lesson> CreateLessonAsync(Lesson lesson)
        {
            return await _lessonRepository.AddAsync(lesson);
        }

        public async Task<Lesson?> GetLessonByIdAsync(int id)
        {
            return await _lessonRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Lesson>> GetLessonsByLevelAsync(int levelId)
        {
            return await _lessonRepository.GetLessonsByLevelAsync(levelId);
        }
        public async Task UpdateLessonAsync(Lesson lesson)     
        {
            await _lessonRepository.UpdateAsync(lesson);
        }
        public async Task<IEnumerable<Lesson>> GetAllLessonsAsync()    
        {
            return await _lessonRepository.GetAllAsync();
        }
        public async Task DeleteLessonAsync(int id)          
        {
            await _lessonRepository.DeleteAsync(id);
        }
    }

}
