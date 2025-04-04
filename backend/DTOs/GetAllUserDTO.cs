using System.ComponentModel.DataAnnotations;
using Azure;

namespace backend.DTOs
{
    public class GetAllUserDTORequest
    {
        public string? orderBy { get; set; } = null;
        public string? orderDirection { get; set; } = null;
        public int? pageNumber { get; set; } = 0;
        public int? pageSize { get; set; } = 0;
        public string? search { get; set; } = null;
    }
    public class GetAllUserDTOResponse{
        public List<DataSourceResponse> DataSource { get;set;} = new List<DataSourceResponse>();
        [Required]
        public int page { get; set; } = 0;  
        [Required]
        public int pageSize { get; set; } = 0;
        [Required]
        public int totalCount { get; set; }=0;
    }
    public class DataSourceResponse{
        [Required]
        public string userId {get; set;}
        [Required]
        public string firstName {get; set;} 
        [Required]
        public string LastName {get; set;}
        [Required]
        public string email {get; set;} 
        [Required]
        public RoleResponse role {get; set;}  
         [Required]
        public string username { get; set; } = string.Empty;
        [Required]
        public List<PermissionsResponse> permissions {get;set;} = new List<PermissionsResponse>();
        [Required]
        public DateTime createdDate {get; set;} = DateTime.MinValue;
          }
    
}