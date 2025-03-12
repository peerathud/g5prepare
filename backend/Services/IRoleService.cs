using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;
public  interface IRoleService{
    Task<List<GetAllRoleDTO>> GetAllRoles();
    
}
