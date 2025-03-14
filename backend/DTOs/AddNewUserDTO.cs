using System.ComponentModel.DataAnnotations;

namespace backend.DTOs{
    //Request
    public class AddNewUserDTORequest{
        [Required]
       public string id { get; set; }=string.Empty;
       [Required]
       public string firstName { get; set; }=string.Empty;
       [Required]
       public string lastName { get; set; }=string.Empty;
       [Required]
       public string email { get; set; }  =string.Empty;
       [Required]  
       public string? phone { get; set; }
       [Required]   
       public string roleId { get; set; }=string.Empty;
       [Required]
       public string username{get; set; }=string.Empty;
       [Required]
       public string password{get; set; }  =string.Empty;
       [Required]
       public  List<PermissionRequest> permissions{ get; set; }
    }

    public class PermissionRequest{
        [Required]
        public string permissionsId { get; set; }=string.Empty;
        public bool isReadable { get; set; }=false;
        [Required]
        public bool isWritable{ get; set; }=false;
        [Required]
        public bool isDeletable { get; set; }=false;
    }
    //Response
    public class AddNewUserDTOResponse{
        public string userId { get; set; } 
       public string firstName { get; set; }
       public string lastName { get; set; }
       public string email { get; set; }   
       public string? phone{ get; set; }
       public RoleResponse role { get; set; }
       public List<PermissionsResponse> permissions{ get; set; } = new List<PermissionsResponse>();
    }
    public class RoleResponse{
        public string roleId { get; set; }
        public string roleName  { get; set; }
    } 
    public class PermissionsResponse{
        public string permissionId {get; set; }
        public string permissionName { get; set; }

    }
}