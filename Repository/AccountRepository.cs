using project.Models;
using project.DataService;
namespace project.Repository{
    public class AccountRepository : IAccountRepository{
        private DataProvider dataProvider = DataProvider.GetInstance();
        public Account GetAccount(Account account){
            string query = $"SELECT * FROM users WHERE Email LIKE BINARY '{account.Email}' AND Password LIKE BINARY MD5('{account.Password}')";
            if(dataProvider.HasRow(query)){
                return account;
            }
            return null;
        }
    }
}