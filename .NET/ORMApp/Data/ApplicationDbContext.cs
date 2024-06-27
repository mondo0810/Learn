using ORMApp.Models;
using System.Data.Entity;

namespace ORMApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("name=DefaultConnection")
        {
        }

        public DbSet<Course> Courses { get; set; }
    }
}
