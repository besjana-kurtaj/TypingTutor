using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypingTutor.Application.IRepository;
using TypingTutor.Application.IService;
using TypingTutor.Domain;

namespace TypingTutor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        private readonly ILevelService _levelService;
        private readonly ILevelRepository _levelRepository;
        public LevelController(ILevelService levelService, ILevelRepository levelRepository)
        {
            _levelService = levelService;
            _levelRepository = levelRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLevels()
        {
            var levels = await _levelService.GetAllLevelsAsync();
            return Ok(levels);
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
        [HttpGet("next")]
        public async Task<IActionResult> GetNextLevel([FromQuery] int levelNumber)
        {
            try
            {
                var nextLevel =await _levelRepository.GetNextLevelAsync(levelNumber);
                return nextLevel == null ? NotFound("No more levels") : Ok(nextLevel);
            }catch (Exception ex)
            {
                return NotFound();
            }
         
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
