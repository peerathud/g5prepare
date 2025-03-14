using System.ComponentModel.DataAnnotations;
namespace backend.DTOs{
    public class DeleteUserDTOResponse{
        public bool result { get; set; } =false;
        public string  message{ get; set; } = string.Empty;
    }
    
}