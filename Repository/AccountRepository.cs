using project.Models;
using project.DataService;
using project.Factory;
namespace project.Repository{
    public class AccountRepository : IAccountRepository{
        private DataProvider dataProvider;
        private AccountFactory accountFactory;
        public AccountRepository(){
            dataProvider = new DataProvider();
            accountFactory = new AccountFactory();
        }
        public Account GetAccount(Account account){
            string query = $"SELECT * FROM Users WHERE Email LIKE BINARY '{account.Email}' AND Password LIKE BINARY MD5('{account.Password}')";
            if(dataProvider.HasRow(query)){
                return account;
            }
            return null;
        }
        public Account GetAccountWithEmail(Account account){
            string query = $"SELECT * FROM Users WHERE Email LIKE BINARY '{account.Email}'";
            if(dataProvider.HasRow(query)){
                return account;
            }
            return null;
        }
        public Account GetAccountWithEmail(string email){
            string query = $"SELECT * FROM Users WHERE Email LIKE BINARY '{email}'";
            if(dataProvider.HasRow(query)){
                return accountFactory.CreateAccount(email, "");
            }
            return null;
        }
        public void AddAccount(Account account){
            if(GetAccountWithEmail(account) == null){
                string query = $"INSERT INTO Users(Email, Password, TimeCreated) VALUES('{account.Email}', MD5('{account.Password}'), CURRENT_TIMESTAMP())";
                dataProvider.ExcuteQuery(query);
            }
        }
        public void AddGoogleAccount(Account account){
            if(GetAccountWithEmail(account) == null){
                string query = $"INSERT INTO Users(Email, TimeCreated) VALUES('{account.Email}', CURRENT_TIMESTAMP())";
                dataProvider.ExcuteQuery(query);
            }
        }
    }
}