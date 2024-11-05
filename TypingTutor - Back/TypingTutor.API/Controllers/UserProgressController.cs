using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> RecordProgress([FromBody] UserProgress userProgress)
        {
            await _userProgressService.RecordProgressAsync(userProgress);
            return CreatedAtAction(nameof(GetProgressByUserId), new { userId = userProgress.UserId }, userProgress);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetProgressByUserId(string userId)
        {
            var progress = await _userProgressService.GetUserProgressAsync(userId);
            return Ok(progress);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgress(int id)
        {
            await _userProgressService.DeleteProgressAsync(id);
            return NoContent();
        }
    }
}
