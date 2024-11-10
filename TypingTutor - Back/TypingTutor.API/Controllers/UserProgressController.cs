using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypingTutor.Application.Dto;
using TypingTutor.Application.IRepository;
using TypingTutor.Application.IService;
using TypingTutor.Domain;
using TypingTutor.Infrastructure.Repository;

namespace TypingTutor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProgressController : ControllerBase
    {
        private readonly IUserProgressService _userProgressService;
        private readonly IUserProgressRepository _userProgressRepository;


        public UserProgressController(IUserProgressService userProgressService, IUserProgressRepository userProgressRepository)
        {
            _userProgressService = userProgressService;
            _userProgressRepository = userProgressRepository;
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
                CompletionDate = userProgressDto.CompletionDate,
                Errors=userProgressDto.Errors
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
        [HttpGet("{userId}/current")]
        public async Task<IActionResult> GetCurrentProgress(string userId)
        {
      
            var progress = await _userProgressRepository.GetCurrentProgressAsync(userId);
            if (progress == null)
            {
                return NotFound("No current progress data found for this user.");
            }
            return Ok(progress);
        }

        [HttpGet("{userId}/history")]
        public async Task<IActionResult> GetPerformanceHistory(string userId)
        {
            var history = await _userProgressRepository.GetPerformanceHistoryAsync(userId);
            if (history == null || !history.Any())
            {
                return NotFound("No performance history found for this user.");
            }
            return Ok(history);
        }
        [HttpGet("all-history")]
        public async Task<IActionResult> GetAllUsersPerformanceHistory()
        {
            var history = await _userProgressRepository.GetAllUsersPerformanceHistoryAsync();
            return Ok(history);
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetOverallUserStatistics()
        {
            var statistics = await _userProgressRepository.GetOverallUserStatisticsAsync();
            return Ok(statistics);
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
