using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Application.Dto
{
    public class UserProgressSummaryDto
    {
        public double AverageSpeed { get; set; }
        public double AverageAccuracy { get; set; }
        public double AverageErrors { get; set; }
        public int MaxLevel { get; set; }
    }

}
