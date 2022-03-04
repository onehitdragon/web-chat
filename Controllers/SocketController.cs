using project.Socket;
using Microsoft.AspNetCore.Mvc;
namespace project.Controllers
{
    public class SocketController : Controller
    {
        public string StartSocket(){      
            SocketListener.StartSocket();    
            return "";
        }
    }
}