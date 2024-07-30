using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace exam.Models
{
    [Table("Department_Tbl")]
    public class Department
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string DepartmentCode { get; set; }
        public string Location { get; set; }
        public int EmployeeCount { get; set; }
        public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
