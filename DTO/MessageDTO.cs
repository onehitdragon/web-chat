using System;
using project.Models;

namespace project.DTO{
    public class MessageDTO{
        public int Id {get; set;}
        public string Content {get; set;}
        public DateTime CreateAt {get; set;}
        public string FileAttachUrl {get; set;}
        
    }
}