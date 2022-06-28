using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Factory;
using System;
using Microsoft.AspNetCore.Http;
using project.MyTool;
using project.DataService;
using project.Repository;
using project.Email;

namespace project.Controllers{
    public class AccountController : Controller{
        private AccountFactory accountFactory;
        private DataProvider dataProvider;
        private IAccountRepository accountRepository;
        private IUserRepository userRepository;
        public AccountController(){
            accountFactory = new AccountFactory();
            dataProvider = new DataProvider();
            accountRepository = new AccountRepository();
            userRepository = new UserRepository();
        }
        
        [HttpPost]
        public IActionResult Login(string Email, string Password, bool SavePassword){
            // check connection
            if(!dataProvider.TestConnect()){
                return Json(new {
                    errorConnection = true
                });
            }

            Account account = accountFactory.CreateAccount(Email, Password);
            bool isWrongAccount = Account.CheckWrongAccount(account);
            if(!isWrongAccount){
                // login success
                // save session
                SessionTool.AddSession(HttpContext, "account", account);
                User user = userRepository.GetUser(Email);
                SessionTool.AddSession(HttpContext, "user", user);

                // save cookie
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

        [HttpPost]
        public IActionResult LoginGoogle(string EmailGoogle, string GoogleName, string AvatarUrl){
            // check connection
            if(!dataProvider.TestConnect()){
                return Json(new {
                    errorConnection = true
                });
            }

            Account account = accountFactory.CreateAccount(EmailGoogle, "");
            User user = new User(GoogleName, AvatarUrl);
            bool accountIsExist = Account.CheckExistAccount(account);
            if(!accountIsExist){
                accountRepository.AddGoogleAccount(account);
            }
            userRepository.UpdateUser(EmailGoogle, user);

            // save session
            SessionTool.AddSession(HttpContext, "account", account);
            user = userRepository.GetUser(EmailGoogle);
            SessionTool.AddSession(HttpContext, "user", user);

            return Json(new {
                accountIsExist = accountIsExist
            });
        }
        
        [HttpPost]
        public IActionResult LoginFacebook(ulong IdUser, string FacebookName, string AvatarUrl){
            // check connection
            if(!dataProvider.TestConnect()){
                return Json(new {
                    errorConnection = true
                });
            }

            Account account = new UserAccount("","");
            User user = new User(IdUser, AvatarUrl, FacebookName);
            if(userRepository.GetUser(user) == null){
                userRepository.AddUser(user);
            }
            else{
                userRepository.UpdateUser(user);
            }

            // save session
            SessionTool.AddSession(HttpContext, "account", account);
            SessionTool.AddSession(HttpContext, "user", user);

            return Json(new {});
        }
    }
}