using Microsoft.EntityFrameworkCore;
using ReactAppNET.Server.Models;
using System.Collections.Generic;

namespace ReactAppNET.Server
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;
    }
}
