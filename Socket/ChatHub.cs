using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using project.Models;
using System.Collections.Generic;
using project.MyTool;
using project.Repository;

namespace project.Socket{
    public class Chat : Hub{
        private ChatHubData chatHubData;
        private ConversationRepository conversationRepository;
        public Chat(){
            chatHubData = ChatHubData.GetInstance();
            conversationRepository = new ConversationRepository();
        }
        public void Init(string json){
            dynamic data = JsonTool.DeCode(json);   
            User user = JsonTool.DeCode<User>(data.user.ToString());
            List<Conversation> listConversation = JsonTool.DeCode<List<Conversation>>(data.listConversation.ToString());
            
            ClientData clientData = new ClientData(user, listConversation);
            chatHubData.AddClient(Context.ConnectionId, clientData);

            Console.WriteLine(Context.ConnectionId);
        }
        override public async Task OnDisconnectedAsync(Exception exception){
            await base.OnDisconnectedAsync(exception);
            chatHubData.RemoveClient(Context.ConnectionId);
            Console.WriteLine(Context.ConnectionId + " disconnected");
        }
        public async Task SendMessage(string json, int messageElementId){
            dynamic data = JsonTool.DeCode(json);

            Conversation conversation = JsonTool.DeCode<Conversation>(data.ToString());
            ClientData clientData = chatHubData.GetClient(Context.ConnectionId);
            Console.WriteLine(conversation.Messages[conversation.Messages.Count - 1].FileAttachUrl);
            conversationRepository.AddMessage(conversation, conversation.Messages[conversation.Messages.Count - 1]);
            UpdateListConversation(clientData.ListConversation, conversation);

            Random rand = new Random();
            int mili = rand.Next(1, 10) * 500;
            await Task.Delay(mili);
            
            UpdateClients(conversation);
            Console.WriteLine("server receive");
            await Clients.Caller.SendAsync("serverReceivedMessage", messageElementId);
        }
        private void UpdateListConversation(List<Conversation> listConversation, Conversation _conversation){
            for(int i = 0; i < listConversation.Count; i++){
                if(listConversation[i].Id == _conversation.Id){
                    listConversation[i] = _conversation;
                    break;
                }
            }
        }
        private void UpdateClients(Conversation _conversation){
            User participant = null;
            ClientData clientData = chatHubData.GetClient(Context.ConnectionId);
            foreach(var _participant in _conversation.Participants){
                if(_participant.Id != clientData.User.Id){
                    participant = _participant;
                }
            }
            foreach(var client in chatHubData.DictionaryClient){
                if(client.Value.User.Id == participant.Id){
                    Clients.Client(client.Key).SendAsync(
                        "haveNewMessage",
                        JsonTool.EnCode(_conversation)
                    );
                }
            }
        }
    }
}