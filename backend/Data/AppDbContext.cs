// AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using backend.Models; 

namespace backend.Data;

public class AppDbContext:DbContext {
    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Users> Users{get; set;} =null!;
    public DbSet<Roles> Roles{get; set;} =null!;    
    
    public DbSet<Permissions> Permissions{get; set;} =null!;

    }