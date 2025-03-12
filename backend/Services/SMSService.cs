using backend.Services;
public class SMSService:IMessageService{
    public void Send(string message){
        Console.WriteLine($"SMS sent:{message}");
    }
}