using System.Collections.Generic;
using project.Models;
namespace project.Repository{
    public interface IFriendRepository{
        List<User> GetListFriend(User user, string type);
        List<User> GetListFriending(User user);
        List<User> GetListRequestingByOther(User user);
        List<User> GetListRequestingByYou(User user);
        List<User> SearchFriend(User user, string key);
        void AddRequestingRelation(User sender, User receiver);
        void RemoveRequestingRelation(User user1, User user2);
        void UpdateFriendingRelation(User sender, User receiver);
    }
}