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
        public List<User> GetListFriend(User user){
            List<User> listFriend = new List<User>();
            string query = $"SELECT * FROM relation WHERE (Sender = {user.Id} OR Receiver = {user.Id}) AND  State = 'friending'";
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
    }
}