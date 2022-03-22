using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using project.Models;
using project.DataService;
using System.Data;
using project.MyTool;
using project.Repository;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace project.Controllers
{
    public class HomeController : Controller
    {
        private IConversationRepository conversationRepository;
        private IWebHostEnvironment environment;
        public HomeController(IWebHostEnvironment environment){
            this.conversationRepository = new ConversationRepository();
            this.environment = environment;
        }
        public IActionResult Index()
        {           
            if(!SessionTool.CheckSession(HttpContext, "account")){   
                return Redirect("/Account/Login");
            }
            Account account = SessionTool.GetSession<Account>(HttpContext, "account");
            User user = SessionTool.GetSession<User>(HttpContext, "user");
            ViewBag.Name = user.LastName + " " +  user.FirstName;
            ViewBag.AvatarUrl = user.AvatarUrl;
            List<Conversation> listConversation = conversationRepository.GetListConversation(user);
            ViewBag.ListConversation = JsonTool.EnCode(listConversation);
            ViewBag.User = JsonTool.EnCode(user);

            return View();
        }
        [HttpPost]
        [RequestSizeLimit(long.MaxValue)]
        [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
        public IActionResult SendFile(IFormFile file){
            Console.WriteLine(file.Length);
            string fileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string relativePath = Path.Combine("UserData", fileName);
            Console.WriteLine(relativePath);
            string path = Path.Combine(environment.ContentRootPath, "wwwroot", relativePath);
            Stream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
            file.CopyTo(fileStream);

            return Json(
                new {
                    fileAttachUrl = relativePath
                }
            );
        }
    }
}
