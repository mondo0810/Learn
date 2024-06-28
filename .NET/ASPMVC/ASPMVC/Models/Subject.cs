using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPMVC.Models
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime ExamDate { get; set; }

        public int Duration { get; set; }

        public string ClassRoom { get; set; }

        public string Faculty { get; set; }

        public string Status { get; set; }

        // Foreign key property
        public int UserId { get; set; }

        // Navigation property for the User relationship
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
