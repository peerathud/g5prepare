using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("api/notification")]
public class NotificationController:ControllerBase{
    private readonly Notification _notification;
    public NotificationController(Notification notification){
        _notification = notification;   
    }
    [HttpPost("send")]
        public IActionResult SendMessage([FromBody]string message){
            _notification.Notify(message);
            return Ok("Message Sent Successfully");
        }
    
}