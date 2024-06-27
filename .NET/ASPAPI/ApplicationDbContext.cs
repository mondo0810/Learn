using Microsoft.EntityFrameworkCore;

namespace ASPAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Subject> Subjects { get; set; }
    }

    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime ExamDate { get; set; }
        public int Duration { get; set; } // Duration in minutes
        public string ClassRoom { get; set; }
        public string Faculty { get; set; }
        public string Status { get; set; }
    }
}
