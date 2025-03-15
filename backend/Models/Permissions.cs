using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Permissions
{
    [Key]
    public string permissionId { get; set; }
    
    [Required]
    public string permissionName { get; set; }  
    public virtual ICollection<User_Permissions> UserPermissions { get; set; } = new List<User_Permissions>();
}