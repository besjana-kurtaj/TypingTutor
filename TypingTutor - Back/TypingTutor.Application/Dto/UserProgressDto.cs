using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Application.Dto
{
    public class UserProgressDto
    {
        public int UserProgressId { get; set; }
        public string UserId { get; set; }
        public int LevelId { get; set; }
        public double Speed { get; set; }
        public double Accuracy { get; set; }
        public int Errors {  get; set; }
        public DateTime CompletionDate { get; set; } = DateTime.UtcNow;
        public string? UserName { get; set; }
    }
}
