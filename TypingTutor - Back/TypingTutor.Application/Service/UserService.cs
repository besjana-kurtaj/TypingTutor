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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> AuthenticateAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null || user.Password != HashPassword(password))
                throw new UnauthorizedAccessException("Invalid credentials");
            return user;
        }

        public async Task RegisterAsync(User user)
        {
            user.Password = HashPassword(user.Password);
            await _userRepository.AddUserAsync(user);
        }

        private string HashPassword(string password)
        {
            // Implement a hashing algorithm here
            return password; // Placeholder
        }
    }
}
