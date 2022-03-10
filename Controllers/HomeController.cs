using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.DataService;
using System.Data;
using project.MyTool;
using project.Repository;

namespace project.Controllers
{
    public class HomeController : Controller
    {
        private IConversationRepository conversationRepository;
        public HomeController(){
            this.conversationRepository = new ConversationRepository();
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
    }
}
