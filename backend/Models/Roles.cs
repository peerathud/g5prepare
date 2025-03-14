using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Roles{
    [Key]
    public string roleId { get; set; } = string.Empty;
    [Required]
    public string roleName { get; set; }= string.Empty;
    [Required]
      [ForeignKey("Permissions")]
    public string permissionId { get; set; }

    public virtual ICollection<Users> Users{ get; set; } =new List<Users>();
        // one-many  กับRole_Permissions
    public virtual Permissions Permissions{ get; set; }
}