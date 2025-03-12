
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api")]
public class RoleController:ControllerBase{
    private readonly IRoleService _roleService;
    public RoleController(IRoleService roleService){
        _roleService = roleService;
    }
    [HttpGet("roles")]
    public async Task<IActionResult> GetRole(){
        var roles = await _roleService.GetAllRoles();
        return Ok(new{status =new{code="200",description ="Roles retrieved successfully"},data =roles});
    }
}