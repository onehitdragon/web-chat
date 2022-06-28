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
            string query = $"SELECT * FROM Users WHERE Email LIKE '{account.Email}' AND Password LIKE MD5('{account.Password}')";
            if(dataProvider.HasRow(query)){
                return account;
            }
            return null;
        }
        public Account GetAccountWithEmail(Account account){
            string query = $"SELECT * FROM Users WHERE Email LIKE '{account.Email}'";
            if(dataProvider.HasRow(query)){
                return account;
            }
            return null;
        }
        public Account GetAccountWithEmail(string email){
            string query = $"SELECT * FROM Users WHERE Email LIKE '{email}'";
            if(dataProvider.HasRow(query)){
                return accountFactory.CreateAccount(email, "");
            }
            return null;
        }
        public void AddAccount(Account account){
            if(GetAccountWithEmail(account) == null){
                string query = $"INSERT INTO Users(Email, Password, TimeCreated) VALUES('{account.Email}', MD5('{account.Password}'), now())";
                dataProvider.ExcuteQuery(query);
            }
        }
        public void AddGoogleAccount(Account account){
            if(GetAccountWithEmail(account) == null){
                string query = $"INSERT INTO Users(Email, TimeCreated) VALUES('{account.Email}', now())";
                dataProvider.ExcuteQuery(query);
            }
        }
    }
}