﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project.Models;
using project.DataService;
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
            return View();
        }
    }
}
