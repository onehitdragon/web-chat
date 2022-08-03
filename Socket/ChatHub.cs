using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using project.Models;
using System.Collections.Generic;
using project.MyTool;
using project.Repository;
using project.Email;

namespace project.Socket{
    public class Chat : Hub{
        private ChatHubData chatHubData;
        private IConversationRepository conversationRepository;
        private IMessageReaderRepository messageReaderRepository;
        private IFriendRepository friendRepository;
        public Chat(){
            chatHubData = ChatHubData.GetInstance();
            conversationRepository = new ConversationRepository();
            messageReaderRepository = new MessageReaderRepository();
            friendRepository = new FriendRepository();
        }
        public void Init(string json){
            dynamic data = JsonTool.DeCode(json);   
            User user = JsonTool.DeCode<User>(data.user.ToString());
            List<Conversation> listConversation = JsonTool.DeCode<List<Conversation>>(data.listConversation.ToString());

            Console.WriteLine(Context.ConnectionId);
            ClientData clientData = new ClientData(user, listConversation);
            chatHubData.AddClient(Context.ConnectionId, clientData);

            Console.WriteLine(user.LastName + " " + user.FirstName + " : " + Context.ConnectionId);
        }
        override public async Task OnDisconnectedAsync(Exception exception){
            await base.OnDisconnectedAsync(exception);
            chatHubData.RemoveClient(Context.ConnectionId);
            Console.WriteLine(Context.ConnectionId + " disconnected");
        }
        public async Task SendMessage(string json){
            dynamic data = JsonTool.DeCode(json);

            string id = data.id.ToString();
            int idConversation = int.Parse(data.idConversation.ToString());
            Message newMessage = JsonTool.DeCode<Message>(data.newMessage.ToString());
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);

            Conversation conversation = conversationRepository.AddMessage(idConversation, newMessage);
            // messageReaderRepository.AddMessage(json);

            Random rand = new Random();
            int mili = rand.Next(1, 10) * 500;
            await Task.Delay(mili);
            
            UpdateClients(id, conversation);
            
        }
        private void UpdateClients(string id, Conversation conversation){
            List<User> listParticipants = conversation.Participants;
            Console.WriteLine(listParticipants.Count.ToString() + "human");
            // loop connected users
            foreach(var client in chatHubData.DictionaryClient){
                if(listParticipants.Exists((participant) => {return participant.Id == client.Value.User.Id;}))
                {
                    this.UpdateListConversation(client.Value.ListConversation, conversation);
                    Clients.Client(client.Key).SendAsync(
                        "haveNewMessage",
                        id,
                        JsonTool.EnCode(conversation)
                    );
                }
            }     
        }
        private void UpdateListConversation(List<Conversation> listConversation, Conversation _conversation){
            for(int i = 0; i < listConversation.Count; i++){
                if(listConversation[i].Id == _conversation.Id){
                    listConversation[i] = _conversation;
                    break;
                }
            }
        }
        public void Typing(int idConversation, bool isTyping){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            Conversation conversation = conversationRepository.GetConversation(idConversation);
            List<User> listOtherParticipants = conversation.GetOtherParticipants(clientData.User);

            // loop connected users
            foreach(var client in chatHubData.DictionaryClient){
                if(listOtherParticipants.Exists((participant) => {return participant.Id == client.Value.User.Id;}))
                {
                    Clients.Client(client.Key).SendAsync(
                        isTyping ? "haveTyping" : "haveStopTyping",
                        JsonTool.EnCode(new {
                            idConversation = idConversation,
                            idUser = clientData.User.Id
                        })
                    );
                }
            }
        }
        public void ReadConversation(string json){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            messageReaderRepository.AddReader(json, clientData.User);
        }
        public void GetAmountMessageNotReaded(string json){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            int amount = messageReaderRepository.GetAmountMessageNotReaded(json, clientData.User);
            Clients.Caller.SendAsync("GetAmountMessageNotReaded", new {
                conversation = json,
                amount = amount
            });
        }
        public void RequestingFriend(User user){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            friendRepository.AddRequestingRelation(me, user);
            string connectionId = chatHubData.GetConnectionId(user);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("requestingFriend", me);
            }
        }
        public void CancerRequesting(User user){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            friendRepository.RemoveRequestingRelation(me, user);
            string connectionId = chatHubData.GetConnectionId(user);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("cancerRequesting", me);
            }
        }
        public void DenyRequesting(User user){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            friendRepository.RemoveRequestingRelation(me, user);
            string connectionId = chatHubData.GetConnectionId(user);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("denyRequesting", me);
            }
        }
        public void AcceptRequesting(User user){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            friendRepository.UpdateFriendingRelation(user, me);
            Conversation conversation = conversationRepository.AddConversation(user, me);
            string connectionId = chatHubData.GetConnectionId(user);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Caller.SendAsync("acceptRequesting", me, conversation);
                Clients.Client(connectionId).SendAsync("acceptRequesting", me, conversation);
            }
        }
        public void CreateGroupConversation(string nameGroup, User[] listUser){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            conversationRepository.AddConversation(nameGroup, me, listUser);
            Clients.Caller.SendAsync("createGroupConversation", me);
            foreach(User user in listUser){
                string connectionId = chatHubData.UserIsOnline(user);
                if(!String.IsNullOrEmpty(connectionId)){
                    Clients.Client(connectionId).SendAsync("createGroupConversation", me);
                }
            }
        }
        public void CallVideo(User receiver){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            string connectionId = chatHubData.UserIsOnline(receiver);
            if(String.IsNullOrEmpty(connectionId)){
                Clients.Caller.SendAsync("canCallVideo", "offline");
            }
            else{
                Clients.Caller.SendAsync("canCallVideo", "canCalling");
                Clients.Client(connectionId).SendAsync("calling", me);
            }
        }
        public void AcceptCalling(User sender){
            string connectionId = chatHubData.UserIsOnline(sender);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("canCallVideo", "startCallVideo");
            }
        }
        public void Offer(User receiver, Object sdp){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            string connectionId = chatHubData.UserIsOnline(receiver);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("offer", me, sdp);
            }
        }
        public void Answer(User receiver, Object sdp){
            string connectionId = chatHubData.UserIsOnline(receiver);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("answer", sdp);
            }
        }
        public void UpdateCandidate(User receiver, Object candidate){
            string connectionId = chatHubData.UserIsOnline(receiver);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("updateCandidate", candidate);
            }
        }
        public void StopCall(User receiver){
            ClientData clientData = chatHubData.GetClientData(Context.ConnectionId);
            User me = clientData.User;
            string connectionId = chatHubData.UserIsOnline(receiver);
            if(!String.IsNullOrEmpty(connectionId)){
                Clients.Client(connectionId).SendAsync("stopCall", me);
            }
        }
    }
}