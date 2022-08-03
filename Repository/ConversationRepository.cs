using project.Models;
using System.Collections.Generic;
using System.Data;
using project.DataService;
using System;

namespace project.Repository{
    public class ConversationRepository : IConversationRepository{
        private DataProvider dataProvider;
        private IUserRepository userRepository;
        public ConversationRepository(){
            this.dataProvider = new DataProvider();
            this.userRepository = new UserRepository();
        }
        public List<Conversation> GetListConversation(User _user){
            ulong idUser = _user.Id;
            string query = $"SELECT conversation.* FROM participants JOIN conversation ON participants.Conversation_Id = conversation.Id WHERE participants.Users_Id = {idUser}";
            DataTable conversationTable = dataProvider.GetDataTable(query);
            List<Conversation> listConversation = new List<Conversation>();
            foreach(DataRow conversationRow in conversationTable.Rows){
                Conversation conversation = new Conversation(
                    int.Parse(conversationRow[0].ToString()),
                    conversationRow[1].ToString(),
                    ulong.Parse(conversationRow[2].ToString()),
                    new List<User>(),
                    new List<Message>()
                );

                int idConversation = conversation.Id;
                query = $"SELECT users.*, AmountMessageNotRead FROM participants JOIN users ON participants.Users_Id = users.id WHERE Conversation_Id = {idConversation}";
                DataTable userTable = dataProvider.GetDataTable(query);
                foreach(DataRow userRow in userTable.Rows){
                    User user = userRepository.CreateUserByDataRow(userRow);
                    conversation.Participants.Add(user);
                    if(user.Id == idUser){
                        conversation.AmountMessageNotRead = int.Parse(userRow[10].ToString());
                    }
                }

                query = "SELECT * FROM messages WHERE Conversation_Id = " + idConversation;
                DataTable messageTable = dataProvider.GetDataTable(query);
                foreach(DataRow messageRow in messageTable.Rows){
                    Message message = new Message(
                        int.Parse(messageRow[0].ToString()),
                        null,
                        messageRow[3].ToString() == "text" ? TypeMessage.Text : TypeMessage.File,
                        messageRow[4].ToString(),
                        messageRow[5].ToString(),
                        DateTime.Parse(messageRow[6].ToString())
                    );
                    foreach(User user in conversation.Participants){
                        if(user.Id == ulong.Parse(messageRow[2].ToString())){
                            message.Sender = user;
                            break;
                        }
                    }
                    conversation.Messages.Add(message);
                }

                listConversation.Add(conversation);
            }

            return listConversation;
        }
        public void AddMessage(Conversation conversation, Message mes){
            if(!String.IsNullOrEmpty(mes.FileAttachUrl)){
                mes.FileAttachUrl = mes.FileAttachUrl.Replace("\\","\\\\");
            }
            string query = $"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) " +
                $"VALUES ({conversation.Id}, {mes.Sender.Id}, N'{mes.TypeMessage}', N'{mes.Content}', '{mes.FileAttachUrl}', CURRENT_TIMESTAMP)";
            dataProvider.ExcuteQuery(query);
        }
        public Conversation AddMessage(int idConversation, Message mes){
            if(!String.IsNullOrEmpty(mes.FileAttachUrl)){
                mes.FileAttachUrl = mes.FileAttachUrl.Replace("\\","\\\\");
            }
            string query = $"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) " +
                $"VALUES ({idConversation}, {mes.Sender.Id}, N'{mes.TypeMessage}', N'{mes.Content}', '{mes.FileAttachUrl}', CURRENT_TIMESTAMP)";
            dataProvider.ExcuteQuery(query);

            query = $"UPDATE participants SET AmountMessageNotRead = AmountMessageNotRead + 1 WHERE Conversation_Id = {idConversation} AND Users_Id != {mes.Sender.Id}";
            dataProvider.ExcuteQuery(query);

            return GetConversation(idConversation);
        }
        public Conversation GetConversation(int idConversation){
            string query = $"SELECT * FROM conversation WHERE Id = {idConversation}";
            DataRow conversationRow = dataProvider.GetDataTable(query).Rows[0];
            Conversation conversation = new Conversation(
                    int.Parse(conversationRow[0].ToString()),
                    conversationRow[1].ToString(),
                    ulong.Parse(conversationRow[2].ToString()),
                    new List<User>(),
                    new List<Message>()
                );

            query = $"SELECT users.* FROM participants JOIN users ON participants.Users_Id = users.id WHERE Conversation_Id = {idConversation}";
            DataTable userTable = dataProvider.GetDataTable(query);
            foreach(DataRow userRow in userTable.Rows){
                User user = userRepository.CreateUserByDataRow(userRow);
                conversation.Participants.Add(user);
            }

            query = "SELECT * FROM messages WHERE Conversation_Id = " + idConversation;
            DataTable messageTable = dataProvider.GetDataTable(query);
            foreach(DataRow messageRow in messageTable.Rows){
                Message message = new Message(
                    int.Parse(messageRow[0].ToString()),
                    null,
                    messageRow[3].ToString() == "text" ? TypeMessage.Text : TypeMessage.File,
                    messageRow[4].ToString(),
                    messageRow[5].ToString(),
                    DateTime.Parse(messageRow[6].ToString())
                );
                foreach(User user in conversation.Participants){
                    if(user.Id == ulong.Parse(messageRow[2].ToString())){
                        message.Sender = user;
                        break;
                    }
                }
                conversation.Messages.Add(message);
            }

            return conversation;
        }
        public Conversation AddConversation(User user1, User user2){
            string query = $"INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'{user1.LastName + " " + user1.FirstName}', {user1.Id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);"
                + "SELECT MAX(Id) FROM conversation;";
            DataTable conversationIdTable = dataProvider.GetDataTable(query);
            int idConversation = int.Parse(conversationIdTable.Rows[0][0].ToString());

            query = $"INSERT INTO participants(Conversation_Id, Users_Id, AmountMessageNotRead) VALUES ((SELECT MAX(Id) FROM conversation), {user1.Id}, 0);"
                + $"INSERT INTO participants(Conversation_Id, Users_Id, AmountMessageNotRead) VALUES ((SELECT MAX(Id) FROM conversation), {user2.Id}, 0);";
            dataProvider.ExcuteQuery(query);

            return GetConversation(idConversation);
        }
        public void AddConversation(string nameConversation, User creator, User[] listParticipants){
            if(listParticipants.Length == 0) return;
            string query = $"INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'{nameConversation}', {creator.Id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)";
            dataProvider.ExcuteQuery(query);
            int idConversation = GetNewestConversationId();
            query = $"INSERT INTO participants(Conversation_Id, Users_Id, AmountMessageNotRead) VALUES ({idConversation}, {creator.Id}, 0);";
            foreach(User participant in listParticipants){
                query += $"INSERT INTO participants(Conversation_Id, Users_Id, AmountMessageNotRead) VALUES ({idConversation}, {participant.Id}, 0);";
            }
            dataProvider.ExcuteQuery(query);
        }
        private int GetNewestConversationId(){
            string query = "SELECT MAX(Id) FROM conversation";
            return int.Parse(dataProvider.GetDataTable(query).Rows[0][0].ToString());
        }

        public void SetAmountMessageNotRead(int idConversation, int idUser, int amount){
            string query = $"UPDATE participants SET AmountMessageNotRead = {amount} WHERE Conversation_Id = {idConversation} AND Users_Id = {idUser}";
            dataProvider.ExcuteQuery(query);
        }
    }
}