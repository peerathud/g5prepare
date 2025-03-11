using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Permissions
{
    [Key]
    public string permissionId { get; set; }
    [Required]
    public string permissionName { get; set; }
    // one-many  กับRole_Permissions
    public virtual ICollection<Role_Permissions> Role_Permissions { get; set; } = new List<Role_Permissions>();
}