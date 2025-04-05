using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class GetUserByIdDTOResponse
    {
        [Required]
        public string id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public RoleResponse role { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public List<PermissionsResponse> permissions { get; set; } = new List<PermissionsResponse>();
    }
    public class GetUserByIdDTOResponse2
    {
        [Required]
        public string id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public RoleResponse role { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public List<GetUserByIdPermissions2> permissions { get; set; } = new List<GetUserByIdPermissions2>();
    }
    public class GetUserByIdPermissions2{
        public string permissionId { get; set; }
         public bool isReadable { get; set; } = false;
        [Required]
        public bool isWritable { get; set; } = false;
        [Required]
        public bool isDeletable { get; set; } = false;

    }
}