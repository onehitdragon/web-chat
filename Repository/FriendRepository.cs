using project.DataService;
using System.Collections.Generic;
using project.Models;
using System.Data;
namespace project.Repository{
    public class FriendRepository : IFriendRepository{
        private DataProvider dataProvider;
        private IUserRepository userRepository;
        public FriendRepository(){
            dataProvider = new DataProvider();
            userRepository = new UserRepository();
        }
        public List<User> SearchFriend(User user, string key){
            List<User> resultList = new List<User>();
            string query = $"SELECT * FROM Users WHERE NOT EXISTS (SELECT relation.Sender FROM relation WHERE (Sender = Users.id AND Receiver = {user.Id}) OR (Sender = {user.Id} AND Receiver = Users.id)) AND CONCAT(LastName,' ',FirstName,' ',Phone) LIKE '%{key}%' AND Users.id != {user.Id}";
            DataTable resultTable = dataProvider.GetDataTable(query);
            foreach(DataRow userRow in resultTable.Rows){
                User _user = userRepository.CreateUserByDataRow(userRow);
                resultList.Add(_user);
            }
            return resultList;
        }
        public List<User> GetListFriend(User user, string type){
            List<User> listFriend = new List<User>();
            string query = $"SELECT * FROM relation WHERE (Sender = {user.Id} OR Receiver = {user.Id}) AND  State = '{type}'";
            if(type == "requestingByOther"){
                query = $"SELECT * FROM relation WHERE Receiver = {user.Id} AND  State = 'requesting'";
            }
            if(type == "requestingByYou"){
                query = $"SELECT * FROM relation WHERE Sender = {user.Id} AND  State = 'requesting'";
            }
            DataTable friendTable = dataProvider.GetDataTable(query);
            foreach(DataRow friendRow in friendTable.Rows){
                ulong idSender = ulong.Parse(friendRow[1].ToString());
                ulong idReceiver = ulong.Parse(friendRow[2].ToString());
                ulong idFriend = idSender != user.Id ? idSender : idReceiver;
                User friend = userRepository.GetUser(idFriend);
                listFriend.Add(friend);
            }
            return listFriend;
        }
        public List<User> GetListFriending(User user){
            return GetListFriend(user, "friending");
        }
        public List<User> GetListRequestingByOther(User user){
            return GetListFriend(user, "requestingByOther");
        }
        public List<User> GetListRequestingByYou(User user){
            return GetListFriend(user, "requestingByYou");
        }
        public void AddRequestingRelation(User sender, User receiver){
            string query = $"INSERT INTO relation(Sender, Receiver, State) VALUES ({sender.Id}, {receiver.Id}, 'requesting')";
            dataProvider.ExcuteQuery(query);
        }
        public void RemoveRequestingRelation(User user1, User user2){
            string query = $"DELETE FROM relation WHERE ((Sender = {user1.Id} AND Receiver = {user2.Id}) OR Sender = {user2.Id} AND Receiver = {user1.Id}) AND State = 'requesting'";
            dataProvider.ExcuteQuery(query);
        }
        public void UpdateFriendingRelation(User sender, User receiver){
            string query = $"UPDATE relation SET State = 'friending' WHERE Sender = {sender.Id} AND Receiver = {receiver.Id}";
            dataProvider.ExcuteQuery(query);
        }
    }
}