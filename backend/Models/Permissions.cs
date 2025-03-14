using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Permissions
{
    [Key]
    public string permissionId { get; set; }
    
    [Required]
    public string permissionName { get; set; }  
    public bool isReadable { get; set; }
    public bool isWritable { get; set; }
    public bool isDeletable { get; set; }
    // one-many  กับRole_Permissions
    public virtual Roles Roles { get; set; }

}