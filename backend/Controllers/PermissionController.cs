
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api")]
public class PermissionController:ControllerBase{
    private readonly IPermissionService _permissionService;
    public PermissionController(IPermissionService permissionService){
            _permissionService = permissionService;
    }
    [HttpGet("permissions")]
    public async Task<IActionResult> GetPermissons(){
        var permissions = await _permissionService.GetAllPermission();
        return Ok(new{status =new{code="200",description="Permissions retrieved successfully"},data=permissions});
    }
}
