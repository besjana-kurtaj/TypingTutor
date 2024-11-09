using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypingTutor.Application.Dto;
using TypingTutor.Application.IService;
using TypingTutor.Domain;

namespace TypingTutor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProgressController : ControllerBase
    {
        private readonly IUserProgressService _userProgressService;

        public UserProgressController(IUserProgressService userProgressService)
        {
            _userProgressService = userProgressService;
        }

        [HttpPost]
        public async Task<IActionResult> RecordProgress([FromBody] UserProgressDto userProgressDto)
        {
            if (userProgressDto == null)
                return BadRequest("User progress data is required.");
            var userProgress = new UserProgress
            {
                UserId = userProgressDto.UserId,
                LevelId = userProgressDto.LevelId,
                Speed = userProgressDto.Speed,
                Accuracy = userProgressDto.Accuracy,
                CompletionDate = userProgressDto.CompletionDate
            };
            await _userProgressService.RecordProgressAsync(userProgress);
            return CreatedAtAction(nameof(GetProgressByUserId), new { userId = userProgress.UserId }, userProgress);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<UserProgress>>> GetProgressByUserId(string userId)
        {
            var progress = await _userProgressService.GetUserProgressAsync(userId);
            if (progress == null || !progress.Any())
                return NotFound($"No progress records found for user with ID {userId}.");

            return Ok(progress);
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProgress(int id)
        //{
        //    var result = await _userProgressService.DeleteProgressAsync(id);
        //    if (!result)
        //        return NotFound($"No progress record found with ID {id}.");

        //    return NoContent();
        //}
    }
}
