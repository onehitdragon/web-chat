using System.Collections.Generic;
using project.Models;
namespace project.Repository{
    public interface IFriendRepository{
        List<User> GetListFriend(User user);
    }
}