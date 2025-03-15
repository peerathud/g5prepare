using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public partial class Roles{
    [Key]
    public string roleId { get; set; } 
    [Required]
    public string roleName { get; set; }= string.Empty;
  
    public virtual ICollection<Users> Users{ get; set; } =new List<Users>();

}