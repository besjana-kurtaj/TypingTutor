using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypingTutor.Application.IService;
using TypingTutor.Domain;

namespace TypingTutor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLesson([FromBody] Lesson lesson)
        {
            var createdLesson = await _lessonService.CreateLessonAsync(lesson);
            return CreatedAtAction(nameof(GetLessonById), new { id = createdLesson.LessonId }, createdLesson);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLessonById(int id)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(id);
            return lesson == null ? NotFound() : Ok(lesson);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLessons()
        {
            var lessons = await _lessonService.GetAllLessonsAsync();
            return Ok(lessons);
        }

        [HttpGet("level/{levelId}")]
        public async Task<IActionResult> GetLessonsByLevel(int levelId)
        {
            var lessons = await _lessonService.GetLessonsByLevelAsync(levelId);
            return Ok(lessons);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(int id, [FromBody] Lesson lesson)
        {
            if (id != lesson.LessonId) return BadRequest();
            await _lessonService.UpdateLessonAsync(lesson);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            await _lessonService.DeleteLessonAsync(id);
            return NoContent();
        }
    }
}
