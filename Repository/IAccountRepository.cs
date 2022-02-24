using project.Models;
namespace project.Repository{
    public interface IAccountRepository{
        Account GetAccount(Account account);
    }
}