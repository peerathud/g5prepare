using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public partial class Users
{
    [Key]
    public string userId { get; set; }= string.Empty;
    [Required]
    public string username { get; set; }= string.Empty;
    [Required]
    public string password { get; set; }= string.Empty;
    [Required]
    public string email { get; set; } = string.Empty;
    [Required]
    public string firstName { get; set; } = string.Empty;
    [Required]
    public string lastName { get; set; } = string.Empty;

    public string? phone { get; set; } = null;
    [ForeignKey("Roles")]
    public string roleId { get; set; }

    public virtual Roles Roles { get; set; } =new Roles();
    
}
