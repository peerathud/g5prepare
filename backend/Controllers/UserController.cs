using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using System.ComponentModel;
[ApiController]
[Route("api")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpPost("user")]
    public async Task<IActionResult> AddNewUser([FromBody] AddNewUserDTORequest request)
    {
        if (request == null)
        {
            return BadRequest(new { message = "invalid request data" });
        }
        Console.WriteLine($"[Controller] Received UserID: {request.id}");
        Console.WriteLine($"[Controller] RoleID: {request.roleId}");
        Console.WriteLine($"[Controller] Permissions Count: {request.permissions?.Count}");
        Console.WriteLine($"[Controller] First Permission ID: {request.permissions.FirstOrDefault()?.permissionsId}");

        try
        {
            var newUser = await _userService.AddNewUser(request);
            return StatusCode(201, new { status = new { code = "201", description = "Add User successfully" }, data = new List<AddNewUserDTOResponse> { newUser } });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var response = await _userService.DeleteUser(id);
        if (!response.result)
        {
            return BadRequest(new
            {
                status = new
                {
                    code = "400",
                    description = "๊User not found"
                },
                data = response
            });
        }
        return Ok(new { status = new { code = "200", description = "Delete user successfully" }, data = response });
    }
    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        try
        {
            var response = await _userService.GetUserById(id);
            return Ok(new
            {
                status = new
                {
                    code = "200",
                    description = "User found"
                },
                data = response
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                status = new
                {
                    code = "400",
                    description = ex.Message
                }
            });
        }
    }
    [HttpPut("users/{id}")]
    public async Task<IActionResult> EditUserById([FromBody] EditUserDTORequest request, string id)
    {
        if (request == null)
        {
            return BadRequest(new 
            { status = new 
            { code = "400", 
            description = "Invalid request data"
             } });
        }
        try
        {
            var response = await _userService.EditUserById(request, id);
            return Ok(new
            {
                status = new
                {
                    code = "200",
                    description = "User found"
                },
                data = response
            });
        }catch(Exception ex)when (ex.Message.Contains("User ID")){
            return BadRequest(new{status= new{
                code = "400",
                description ="Usr ID not found"

            }});
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                status = new
                {
                    code = "400",
                    description = ex.Message
                }
            });
        }
    }
}