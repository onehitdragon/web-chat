using project.Repository;
namespace project.Models{
    public abstract class Account{
        protected string email;
        protected string password;
        protected static IAccountRepository accountRepository = new AccountRepository();
        public string Email{
            get {
                return email;
            }
            set {
                email = value;
            }
        }
        public string Password{
            get {
                return password;
            }
            set {
                password = value;
            }
        }
        public Account(){}
        public Account(string email){
            this.email = email;
        }
        public Account(string email, string password){
            this.email = email;
            this.password = password;           
        }
        public static bool CheckWrongAccount(Account account){ 
            if(accountRepository.GetAccount(account) != null){
                return false;
            }
            return true;
        }
        public static bool CheckExistAccount(Account account){
            if(accountRepository.GetAccountWithEmail(account) != null){
                return true;
            }
            return false;
        }
        public abstract string GetDefaultUrl();
        public static bool IsAdmin(Account account){
            if(account.email == "admin"){
                return true;
            }
            return false;
        }
    }
}