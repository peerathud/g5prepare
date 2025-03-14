using backend.DTOs;

public interface IUserService {
    Task<AddNewUserDTOResponse> AddNewUser(AddNewUserDTORequest addNewUserDTORequest);
    
}
