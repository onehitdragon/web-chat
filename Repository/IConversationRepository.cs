using System.Collections.Generic;
using project.Models;
namespace project.Repository{
    public interface IConversationRepository{
        List<Conversation> GetListConversation(User user);
        void AddMessage(Conversation conversation, Message mes);
        Conversation AddMessage(int idConversation, Message mes);
        Conversation GetConversation(int idConversation);
        void AddConversation(User user1, User user2);
        void AddConversation(string nameConversation, User creator, User[] listParticipants);
    }
}