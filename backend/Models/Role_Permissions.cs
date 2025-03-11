using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Role_Permissions{
    [Key]
    public string rolePermissionId { get; set; }
    [Required]
    [ForeignKey("Roles")]
    public string roleId { get; set; }
    [Required]
    [ForeignKey("Permissons")]
    public string permissionId { get; set; }
    // many-to-one กับ Roles
    public virtual  Roles Roles { get; set; }
    // many-to-one กับ Permissions
    public virtual Permissions Permissions{ get; set; }
}