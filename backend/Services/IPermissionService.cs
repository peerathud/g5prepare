using backend.DTOs;

public interface IPermissionService{
    Task<List<GetAllPermissionDTO>> GetAllPermission();
}