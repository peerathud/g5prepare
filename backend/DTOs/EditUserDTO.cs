using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class EditUserDTORequest
    {
        [Required]
        public string firstName { get; set; } = string.Empty;
        [Required]
        public string lastName { get; set; } = string.Empty;
        [Required]
        public string email { get; set; } = string.Empty;
        public string? phone { get; set; }
        [Required]
        public string roleId { get; set; }
        [Required]
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        [Required]
        public List<EditPermissionRequest> permission { get; set; } = new List<EditPermissionRequest>();

    }
      public class EditPermissionRequest
    {
        [Required]
        public string permissionId { get; set; }
        public bool isReadable { get; set; } = false;
        [Required]
        public bool isWritable { get; set; } = false;
        [Required]
        public bool isDeletable { get; set; } = false;
    }
    public class EditUserDTOResponse
    {
        public string userId { get; set; }
        public string firstName { get; set; }
        public string LastName { get; set; }
        public string email { get; set; }
        public string? phone { get; set; }
        public RoleResponse role { get; set; }
        public string username { get; set; }
        public List<PermissionsResponse> permissions { get; set; } = new List<PermissionsResponse>();

    }
}