using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
[ApiController]
[Route("api")]
public class UserController:ControllerBase{
    private readonly IUserService _userService;
    public UserController(IUserService userService){
        _userService = userService;
    }
    [HttpPost("user")]
    public async Task<IActionResult> AddNewUser([FromBody] AddNewUserDTORequest request){
        if(request==null){
            return BadRequest(new{message="invalid request data"});
        }
        try{
            var newUser = await _userService.AddNewUser(request);
            return Ok(new{status=new{code="200",description="Add User successfully"},data = new List<AddNewUserDTOResponse> { newUser }});
        }catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
}