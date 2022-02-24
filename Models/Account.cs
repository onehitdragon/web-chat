using project.Repository;
namespace project.Models{
    public abstract class Account{
        private string email;
        private string password;
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
        public Account(string email, string password){
            this.email = email;
            this.password = password;           
        }
        public bool CheckWrongAccount(){
            IAccountRepository accountRepository = new AccountRepository();
            if(accountRepository.GetAccount(this) != null){
                return false;
            }
            return true;
        }
        public abstract string GetDefaultUrl();
        public bool isAdmin(){
            return false;
        }
    }
}