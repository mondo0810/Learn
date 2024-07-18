using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ASPMVC.Models
{
    [Table("Employee_Tbl")]
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [Required]
        [MaxLength(100)]
        public string EmployeeName { get; set; }

        [Required]
        [MaxLength(10)]
        public string EmployeeCode { get; set; }

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }

        [MaxLength(50)]
        public string Rank { get; set; }
    }
}
