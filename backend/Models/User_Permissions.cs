using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
namespace backend.Models;
public partial class User_Permissions
{
    [Key]
    public int userPermissionId { get; set; }
    [ForeignKey("Users")]
    public string userId { get; set; }
    [ForeignKey("Permissions")]
    public string permissionId { get; set; }
    public bool isReadable { get; set; }
    public bool isWritable { get; set; }
    public bool isDeletable { get; set; }
    
    public virtual Users Users{ get; set; }
    public virtual Permissions Permissions{ get; set; }

}