using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TypingTutor.API.Models;
using TypingTutor.Application.Service;
using TypingTutor.Domain;

namespace TypingTutor.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly AuthService _authService;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthController(UserManager<User> userManager, AuthService authService, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _authService = authService;
            _roleManager = roleManager;
        }   


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.Username 
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "user");
                return Ok("User registered successfully");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
         {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid email or password");
            }

            var token = GenerateJwtToken(user);
            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            return Ok(new
            {
                Token = token,
                Role = role,
                UserId=user.Id,
                Message = "Login successful"
            });
        }
        private string GenerateJwtToken(User user)
        {
          
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),    
            };

            var roles = _userManager.GetRolesAsync(user).Result;
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("c8ec220c-be7d-4e47-97c7-098bf6a57ce1")); 
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7291/",
                audience: "http://localhost:4200/",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }


}
