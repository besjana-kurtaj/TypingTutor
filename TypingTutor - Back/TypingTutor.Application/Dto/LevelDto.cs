using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Application.Dto
{
    public class LevelDto
    {
        public int LevelNumber { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Difficulty { get; set; }
        public int TimeLimitInSeconds { get; set; }
        public int LevelId { get; set; }
    }

}
