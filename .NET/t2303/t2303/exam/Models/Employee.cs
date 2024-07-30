using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace exam.Models
{
    [Table("Employee_Tbl")]
    public class Employee
    {
        public long Id { get; set; }
        [Required, StringLength(150)]
        public string Name { get; set; }
        public string EmployeeCode { get; set; }
        public string Rank { get; set; }
        public long? DepartmentId { get; set; }

        public virtual Department? Department { get; set; }
    }
}
