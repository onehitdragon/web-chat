using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project.Models;
using project.Models.DataService;
using System.Data;

namespace project.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {            
            return View();
        }
        public IActionResult StartSocket(){
            SocketListener.StartSocket();
            Console.WriteLine("Close Socket");           
            return View();
        }
    }
}
