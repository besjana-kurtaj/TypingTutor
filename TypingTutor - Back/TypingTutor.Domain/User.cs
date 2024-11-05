
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TypingTutor.Domain
{
    public class User : IdentityUser
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Define any additional properties here, but do not redefine properties like UserName, Email, etc.
        public ICollection<UserProgress> UserProgresses { get; set; }
  

    }
}
