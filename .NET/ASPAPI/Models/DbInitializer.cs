namespace ASPAPI.Models
{
    public static class DbInitializer
    {
        public static void Initialize(MyDatabaseContext context)
        {
            context.Database.EnsureCreated();

            // Look for any roles.
            if (context.Roles.Any())
            {
                return;   // DB has been seeded
            }

            var roles = new Role[]
            {
            new Role{Name="Admin"},
            new Role{Name="User"}
            };

            foreach (Role r in roles)
            {
                context.Roles.Add(r);
            }
            context.SaveChanges();

            var users = new User[]
            {
            new User{Name="Admin User",Email="admin",Password=BCrypt.Net.BCrypt.HashPassword("admin"), Balance=0}
            };

            foreach (User u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();

            var userRoles = new UserRole[]
            {
            new UserRole{UserId=users.Single(u => u.Email == "admin").Id, RoleId=roles.Single(r => r.Name == "Admin").Id}
            };

            foreach (UserRole ur in userRoles)
            {
                context.UserRoles.Add(ur);
            }
            context.SaveChanges();
        }
    }

}
