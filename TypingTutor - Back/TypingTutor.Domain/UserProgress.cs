using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Domain
{
    public class UserProgress
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LevelId { get; set; }
        public bool Completed { get; set; }
    }
}
