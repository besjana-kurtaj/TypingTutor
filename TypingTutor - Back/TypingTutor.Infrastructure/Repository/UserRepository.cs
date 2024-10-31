using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Application.IRepository;
using TypingTutor.Domain;

namespace TypingTutor.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly TypingTutorDbContext _context;

        public UserRepository(TypingTutorDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByIdAsync(int userId) => await _context.Users.FindAsync(userId);

        public async Task<User> GetUserByUsernameAsync(string username) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
