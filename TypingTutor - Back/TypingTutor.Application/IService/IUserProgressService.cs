using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Domain;

namespace TypingTutor.Application.IService
{
    public interface IUserProgressService
    {
        Task RecordProgressAsync(UserProgress progress);
        Task<IEnumerable<UserProgress>> GetUserProgressAsync(string userId);
        Task DeleteProgressAsync(int id);
    }
}
