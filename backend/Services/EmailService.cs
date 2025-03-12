using backend.Services;

public class EmailService:IMessageService{
    public void Send(string message){
        Console.WriteLine($"Email sent:{message}");
    }
}