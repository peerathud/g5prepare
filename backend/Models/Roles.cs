using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Roles{
    [Key]
    public string roleId { get; set; }
    [Required]
    public string roleName { get; set; }

    public virtual ICollection<Users> Users{ get; set; } =new List<Users>();
        // one-many  กับRole_Permissions
    public virtual ICollection<Role_Permissions> Role_Permissions{ get;} =new List<Role_Permissions>();
}