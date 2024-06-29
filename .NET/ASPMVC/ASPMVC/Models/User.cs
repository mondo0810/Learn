using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ASPMVC.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Range(10, 100, ErrorMessage = "Age must be between 10 and 100")]
        public int Age { get; set; }

        [StringLength(50, ErrorMessage = "Phone number must be less than 50 characters")]
        public string PhoneNumber { get; set; }

    }
}
