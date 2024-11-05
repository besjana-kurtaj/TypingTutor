using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypingTutor.Application.IService;
using TypingTutor.Domain;

namespace TypingTutor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        private readonly ILevelService _levelService;

        public LevelController(ILevelService levelService)
        {
            _levelService = levelService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLevel([FromBody] Level level)
        {
            var createdLevel = await _levelService.CreateLevelAsync(level);
            return CreatedAtAction(nameof(GetLevelById), new { id = createdLevel.LevelId }, createdLevel);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLevelById(int id)
        {
            var level = await _levelService.GetLevelByIdAsync(id);
            return level == null ? NotFound() : Ok(level);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLevels()
        {
            var levels = await _levelService.GetAllLevelsAsync();
            return Ok(levels);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLevel(int id, [FromBody] Level level)
        {
            if (id != level.LevelId) return BadRequest();
            await _levelService.UpdateLevelAsync(level);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLevel(int id)
        {
            await _levelService.DeleteLevelAsync(id);
            return NoContent();
        }
    }
}
