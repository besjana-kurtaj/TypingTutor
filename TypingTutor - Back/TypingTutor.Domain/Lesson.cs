using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Domain
{
    public class Lesson
    {
        public int LessonId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int LevelId { get; set; }

        // Navigation properties
        public Level Level { get; set; }
        public ICollection<UserProgress> UserProgresses { get; set; }
    }
}
