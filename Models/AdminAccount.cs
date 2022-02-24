namespace project.Models{
    public class AdminAccount : Account{
        public AdminAccount(string email, string password):base(email, password){

        }
        public override string GetDefaultUrl(){
            return "/Admin";
        }
        new public bool isAdmin(){
            return true;
        }
    }
}