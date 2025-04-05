using backend.DTOs;

public interface IUserService
{
    Task<GetAllUserDTOResponse> GetAllUser(GetAllUserDTORequest getAllUserDTORequest);
    Task<AddNewUserDTOResponse> AddNewUser(AddNewUserDTORequest addNewUserDTORequest);
    Task<DeleteUserDTOResponse> DeleteUser(string id);
    Task<GetUserByIdDTOResponse> GetUserById(string id);
    Task<GetUserByIdDTOResponse2> GetUserById2(string id);
    Task<EditUserDTOResponse> EditUserById(EditUserDTORequest editUserDTORequest, string id);
}
