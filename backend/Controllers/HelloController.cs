using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/Hello")]
    [ApiController]
    public class HelloController: ControllerBase{
        private readonly HelloService _helloService;
        public HelloController(HelloService helloService){
            _helloService = helloService;
        }
        [HttpGet]
        public IActionResult GetHello(){
            var message =_helloService.GetHelloMessage();
            return Ok(new{message});
        }
    }
}