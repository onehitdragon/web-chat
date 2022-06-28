using System.Data;
using System;
using Npgsql;
namespace project.DataService{
    public class DataProvider{
        private string connectionStr = DataBaseConfig.postgreSqlConnectionStr;
        public bool TestConnectionToMySql(){
            try{
                NpgsqlConnection connect = new NpgsqlConnection(DataBaseConfig.postgreSqlConnectionStr);
                connect.Open();
                connect.ReloadTypes();
                connect.Close();
            }
            catch(Exception ex){
                Console.WriteLine(ex.ToString());
                return false;
            }
            return true;
        }
        public bool TestConnectionToDB(){
            try{
                NpgsqlConnection connect = new NpgsqlConnection(DataBaseConfig.postgreSqlConnectionStr);
                connect.Open();
                Console.WriteLine("opened");
                connect.Close();
            }
            catch{
                return false;
            }
            return true;
        }
        public bool TestConnect(){
            if(TestConnectionToMySql() && TestConnectionToDB()){
                return true;
            }
            return false;
        }       
        //
        public void ExcuteQuery(string query){
            NpgsqlConnection connect = new NpgsqlConnection(connectionStr);
            connect.Open();
            NpgsqlCommand cmd = new NpgsqlCommand(query, connect);
            cmd.ExecuteNonQuery();
            connect.Close();
        }
        public void ExcuteQueryNonDB(string query){   
            NpgsqlConnection connect = new NpgsqlConnection(DataBaseConfig.postgreSqlConnectionStr);
            connect.Open();
            NpgsqlCommand cmd = new NpgsqlCommand(query, connect);
            cmd.ExecuteNonQuery();
            connect.Close();
        }
        public DataTable GetDataTable(string query){
            NpgsqlConnection connect = new NpgsqlConnection(connectionStr);
            connect.Open();
            NpgsqlCommand cmd = new NpgsqlCommand(query, connect);
            NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(cmd);
            DataTable tb = new DataTable();
            adapter.Fill(tb);
            connect.Close();

            return tb;
        }
        public bool HasRow(string query){
            return GetDataTable(query).Rows.Count > 0 ? true : false;
        }
    }
}