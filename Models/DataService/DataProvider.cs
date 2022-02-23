using MySql.Data.MySqlClient;
using System.Data;
namespace project.Models.DataService{
    public class DataProvider{
        private static DataProvider instance;
        private string connectionStr = DataBaseConfig.mySqlConnectionStr;
        private DataProvider(){}
        public static DataProvider GetInstance(){
            if(instance == null){
                instance = new DataProvider();
            }
            return instance;
        }
        public bool TestConnectionToDB(){
            try{
                MySqlConnection connect = new MySqlConnection(DataBaseConfig.mySqlConnectionStrNoDB);
                connect.Open();
            }
            catch{
                return false;
            }
            return true;
        }
        //
        public void ExcuteQuery(string query){
            MySqlConnection connect = new MySqlConnection(connectionStr);
            connect.Open();
            MySqlCommand cmd = new MySqlCommand(query, connect);
            cmd.ExecuteNonQuery();
            connect.Close();
        }
        public void ExcuteQueryNonDB(string query){   
            MySqlConnection connect = new MySqlConnection(DataBaseConfig.mySqlConnectionStrNoDB);
            connect.Open();
            MySqlCommand cmd = new MySqlCommand(query, connect);
            cmd.ExecuteNonQuery();
            connect.Close();
        }
        public DataTable GetDataTable(string query){
            MySqlConnection connect = new MySqlConnection(connectionStr);
            connect.Open();
            MySqlCommand cmd = new MySqlCommand(query, connect);
            MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
            DataTable tb = new DataTable();
            adapter.Fill(tb);
            connect.Close();

            return tb;
        }
    }
}