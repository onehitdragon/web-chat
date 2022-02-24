using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Factory;
using System;
using Microsoft.AspNetCore.Http;
using project.MyTool;

namespace project.Controllers{
    public class AccountController : Controller{
        private AccountFactory accountFactory = new AccountFactory();
        public IActionResult Login(){
            Account defaultAccount = accountFactory.CreateAccount("","");
            defaultAccount.Email = CookieTool.GetCookie(HttpContext, "email");
            defaultAccount.Password = CookieTool.GetCookie(HttpContext, "password");
            ViewData["account"] = defaultAccount;
            ViewData["savePassword"] = false;

            return View();
        }
        [HttpPost]
        public IActionResult Login(string Email, string Password, bool SavePassword){
            Account account = accountFactory.CreateAccount(Email, Password);
            bool isWrongAccount = account.CheckWrongAccount();
            if(!isWrongAccount){
                // login success
                if(!CookieTool.CheckCookie(HttpContext, "email", account.Email)){
                    CookieTool.CreateCookieDays(HttpContext, "email", account.Email, 7, "/Account/Login");
                }
                if(SavePassword){
                    CookieTool.CreateCookieDays(HttpContext, "password", account.Password, 7, "/Account/Login");
                }
                else{
                    CookieTool.DeleteCookie(HttpContext, "password", "/Account/Login");
                }
            }

            return Json(new {
                isSuccess = !isWrongAccount,
                nextUrl = account.GetDefaultUrl()
            });
        }
    }
}