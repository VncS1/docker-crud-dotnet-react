using backend.Models;

namespace backend.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Users.Any())
            {
                return;   
            }

            var users = new List<User>
            {
                new User
                {
                    Name = "Avaliador Admin",
                    Email = "admin@teste.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"), 
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "Usuário Comum",
                    Email = "user@teste.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("User123"),
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "Usuário Comum2",
                    Email = "user2@teste.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("User123"),
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "Usuário Comum3",
                    Email = "user3@teste.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("User123"),
                    CreatedAt = DateTime.UtcNow
                }
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}