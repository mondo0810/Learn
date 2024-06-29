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



    }
}
