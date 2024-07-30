using System.ComponentModel.DataAnnotations;

namespace ASPAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Balance{ get; set; }

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
