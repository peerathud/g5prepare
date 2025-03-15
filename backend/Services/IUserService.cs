using backend.DTOs;

public interface IUserService
{
    Task<AddNewUserDTOResponse> AddNewUser(AddNewUserDTORequest addNewUserDTORequest);
    Task<DeleteUserDTOResponse> DeleteUser(string id);
    Task<GetUserByIdDTOResponse> GetUserById(string id);

    Task<EditUserDTOResponse> EditUserById(EditUserDTORequest editUserDTORequest, string id);
}
