using System;
using Microsoft.AspNetCore.Mvc;
using project.Models.DataService;

namespace project.Controllers
{
    public class DatabaseController : Controller{
        public IActionResult Init(){
            DataProvider dataProvider = DataProvider.GetInstance();
            bool isSuccess = dataProvider.TestConnectionToDB();
            if(isSuccess){
                DataBaseInit dataBaseInit = DataBaseInit.GetInstance();
                dataBaseInit.InitChatAppDB();
                Console.WriteLine("call init");
            }
            
            ViewData["isSuccess"] = isSuccess;           
            return View();
        }
    }
}