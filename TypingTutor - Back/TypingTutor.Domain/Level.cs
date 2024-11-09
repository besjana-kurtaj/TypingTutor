using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Domain
{
    public class Level
    {
        public int LevelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Difficulty { get; set; }
        public int TimeLimitInSeconds { get; set; } = 0;
        public string Description { get; set; }

    }
}
