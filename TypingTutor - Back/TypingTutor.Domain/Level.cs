using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Domain
{
    public class Level
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int TimeLimit { get; set; }
        public int Complexity { get; set; }
    }
}
