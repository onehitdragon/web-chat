using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Server;
using project.Models;
using project.MyTool;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;

namespace project.Socket{
    public class ConversationBehavior : WebSocketBehavior{
        private List<Conversation> listConversation;
        public List<Conversation> ListConversation{
            get{
                return listConversation;
            }
            set{
                listConversation = value;
            }
        }
        public ConversationBehavior(){
            listConversation = new List<Conversation>();
        }
        protected override void OnOpen()
        {
            Send(JsonTool.EnCode(new {
                type = "handshake"
            }));
            try{
                //Console.WriteLine(SocketListener.httpContext.Session.GetString("account"));
            }
            catch(Exception ex){
                Console.WriteLine(ex);
            }
        }
        protected override void OnClose(CloseEventArgs e)
        {
            
        }
        protected override void OnMessage (MessageEventArgs e)
        {
            try{
                dynamic data = JsonTool.DeCode(e.Data);
                if(data.type == "init"){
                    listConversation = JsonTool.DeCode<List<Conversation>>(data.listConversation.ToString());
                }
                if(data.type == "sendMessage"){
                    Console.WriteLine(data.message);
                }
            }
            catch(Exception ex){
                Console.WriteLine(ex);
            }
        }
    }
    public class SocketListener{
        public HttpContext httpContext;
        public SocketListener(IHttpContextAccessor httpContextAccessor){
            Console.WriteLine("Create");
            httpContext = httpContextAccessor.HttpContext;
        }
        public static void StartSocket(){
            var wssv = new WebSocketServer("ws://127.0.0.1:12345");
            wssv.AddWebSocketService<ConversationBehavior>("/Conversation");
            
            Console.WriteLine("Listing ws://127.0.0.1:12345/Conversation...");
            wssv.Start();
            Console.ReadKey();
            wssv.Stop();
            Console.WriteLine("Stop server!");
        }
    }
}
