using ASPMVC.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPMVC
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Subject> Subjects { get; set; }
        public DbSet<User> Users { get; set; }

    }


}
