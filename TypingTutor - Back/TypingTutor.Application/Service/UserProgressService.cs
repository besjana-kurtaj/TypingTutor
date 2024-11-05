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
    public class UserProgressService : IUserProgressService
    {
        private readonly IUserProgressRepository _userProgressRepository;

        public UserProgressService(IUserProgressRepository userProgressRepository)
        {
            _userProgressRepository = userProgressRepository;
        }

        public async Task RecordProgressAsync(UserProgress progress)
        {
            await _userProgressRepository.AddAsync(progress);
        }

        public async Task<IEnumerable<UserProgress>> GetUserProgressAsync(string userId)
        {
            return await _userProgressRepository.GetProgressByUserIdAsync(userId);
        }
        public async Task DeleteProgressAsync(int id)   
        {
            await _userProgressRepository.DeleteAsync(id);
        }
    }

}
