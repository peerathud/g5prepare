using backend.Services;

public class Notification{
    private readonly IMessageService _messageService;
    public Notification(IMessageService messageService){
        _messageService = messageService;
    }
    public void Notify(string message){
        _messageService.Send(message);
    }
}