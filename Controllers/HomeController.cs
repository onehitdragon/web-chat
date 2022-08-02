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
        private IFriendRepository friendRepository;
        public HomeController(IWebHostEnvironment environment){
            this.conversationRepository = new ConversationRepository();
            this.environment = environment;
            this.friendRepository = new FriendRepository();
        }
        public IActionResult Index()
        {          
            if(!SessionTool.CheckSession(HttpContext, "account")){ 
                return Json(new {
                    error = "nologin"
                });
            }
            Account account = SessionTool.GetSession<Account>(HttpContext, "account");
            User user = SessionTool.GetSession<User>(HttpContext, "user");
            ViewBag.Name = user.LastName + " " +  user.FirstName;
            ViewBag.AvatarUrl = user.AvatarUrl;
            List<Conversation> listConversation = conversationRepository.GetListConversation(user);
            ViewBag.ListConversation = JsonTool.EnCode(listConversation);
            ViewBag.User = JsonTool.EnCode(user);
            List<User> listFriending = friendRepository.GetListFriending(user);
            List<User> listQuestingByOther = friendRepository.GetListRequestingByOther(user);
            List<User> listQuestingByYou = friendRepository.GetListRequestingByYou(user);

            return Json(new {
                you = user,
                listConversation = listConversation,
                listFriending = listFriending,
                listQuestingByYou = listQuestingByYou,
                listQuestingByOther = listQuestingByOther
            });
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
        public IActionResult GetListConversation(){
            if(!SessionTool.CheckSession(HttpContext, "account")){   
                return Redirect("/Account/Login");
            }
            User user = SessionTool.GetSession<User>(HttpContext, "user");
            List<Conversation> listConversation = conversationRepository.GetListConversation(user);

            return Content(JsonTool.EnCode(listConversation));
        }

        [HttpPut]
        public IActionResult UpdateAmountMessageNotRead(int idConversation, int idUser){
            if(!SessionTool.CheckSession(HttpContext, "account")){ 
                return Json(new {
                    error = "nologin"
                });
            }
            conversationRepository.SetAmountMessageNotRead(idConversation, idUser, 0);
            return Json(new {
                state = "success"
            });
        }
    }
}
