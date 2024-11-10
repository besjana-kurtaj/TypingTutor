using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypingTutor.Application.Dto;
using TypingTutor.Domain;

namespace TypingTutor.Application.IRepository
{
    public interface ILevelRepository : IRepository<Level> {

        Task<LevelDto> GetNextLevelAsync(int currentId);
    }

}
