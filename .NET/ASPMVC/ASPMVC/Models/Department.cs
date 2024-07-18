using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ASPMVC.Models
{
    [Table("Department_Tbl")]
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(100)]
        public string DepartmentName { get; set; }

        [Required]
        [MaxLength(10)]
        public string DepartmentCode { get; set; }

        [MaxLength(100)]
        public string Location { get; set; }

        public int NumberOfPersonals { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }

}
