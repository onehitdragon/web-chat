using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Factory;
using System;
using Microsoft.AspNetCore.Http;
using project.MyTool;
using project.DataService;
using project.Repository;

namespace project.Controllers{
    public class AdminController : Controller{
        public IActionResult Index(){
            if(SessionTool.CheckSession(HttpContext, "account")){
                Account account = SessionTool.GetSession<UserAccount>(HttpContext, "account");
                if(Account.IsAdmin(account)){
                    return Content("This is Admin Page");
                }
                else{
                    return Redirect("/Home");
                }
            }
            return Redirect("/Account/Login");
        }
    }
}