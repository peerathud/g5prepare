using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public partial class Users
{
    [Key]
    public string id { get; set; }
    [Required]
    public string username { get; set; }
    [Required]
    public string password { get; set; }
    [Required]
    public string email { get; set; } 
    [Required]
    public string firstName { get; set; } 
    [Required]
    public string lastName { get; set; } 

    public string? phone { get; set; } = null;
    [ForeignKey("Roles")]
    public string roleId { get; set; }

    public virtual Roles Roles { get; set; }
    
}
