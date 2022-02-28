using project.Models;
namespace project.Repository{
    public interface IAccountRepository{
        Account GetAccount(Account account);
        Account GetAccountWithEmail(Account account);
        Account GetAccountWithEmail(string email);
        void AddAccount(Account account);
        void AddGoogleAccount(Account account);
    }
}