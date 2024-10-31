using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypingTutor.Application.IService;
using TypingTutor.Domain;

namespace TypingTutor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginDto)
        {
            var user = await _userService.AuthenticateAsync(loginDto.Username, loginDto.Password);
            return Ok(user); 
        }
    }
}
