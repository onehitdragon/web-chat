namespace project.DataService{
    public class DataBaseInit{
        private static DataBaseInit instance;
        private readonly DataProvider dataProvider = new DataProvider();
        private DataBaseInit(){}
        public static DataBaseInit GetInstance(){
            if(instance == null){
                instance = new DataBaseInit();
            }
            return instance;
        }
        //
        public void InitChatAppDB(){
            // create user table
            string query = "CREATE TABLE IF NOT EXISTS Users("
                +"id BIGSERIAL PRIMARY KEY,"
                +"AvatarUrl text,"
                +"FirstName VARCHAR(100),"
                +"LastName VARCHAR(100),"
                +"BirthDay date,"
                +"Gender int,"
                +"Email varchar(100),"
                +"Password varchar(100),"
                +"Phone varchar(13),"
                +"TimeCreated timestamp,"
                +"UNIQUE(Email)"
            +");";           
            dataProvider.ExcuteQuery(query);
            
            // init user data
            query = "SELECT * FROM Users";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'B',N'Nguyễn','1997/1/15',1,'B@gmail.com', MD5('12345'), '08684242451', now());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'admin',N'admin','1999/5/23',0,'admin', MD5('admin'), '28614242451', now());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'C',N'Trần','1999/5/23',0,'C@gmail.com', MD5('12345'), '08614242451', now());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'G',N'Trần','2001/6/5',0,'G@gmail.com', MD5('12345'), '68614142451', now());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'A',N'Ngọc','1999/2/16',1,'A@gmail.com', MD5('12345'), '58614242451', now());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'Z',N'Huỳnh','2005/11/29',0,'Z@gmail.com', MD5('12345'), '18614242451', now());";
                dataProvider.ExcuteQuery(query);
            }

            //create active table
            query = "CREATE TABLE IF NOT EXISTS UserActive ("
                +"id BIGINT,"
                +"ActiveCode varchar(100),"
                +"FOREIGN KEY (id) REFERENCES Users(id)"           
            +")";
            dataProvider.ExcuteQuery(query);

            // init active data
            query = "SELECT * FROM UserActive";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO UserActive VALUES(3, 'abc');"
                        +"INSERT INTO UserActive VALUES(5, '123')";
                dataProvider.ExcuteQuery(query);
            }

            // create conversation table
            query = "CREATE TABLE IF NOT EXISTS conversation("
                +"Id SERIAL PRIMARY KEY,"
                +"Title varchar(100),"
                +"Creator_Id BIGINT,"
                +"Create_at timestamp,"
                +"Update_at timestamp,"
                +"Delete_at timestamp,"
                +"FOREIGN KEY (Creator_Id) REFERENCES Users(id)"
            +")";
            dataProvider.ExcuteQuery(query);

            //init conversation data
            query = "SELECT * FROM conversation";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'Nguyễn B', 1, now(), now(), NULL);"
                    +"INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'Ngọc A', 4, now(), now(), NULL);"
                    +"INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'Trần G', 3, now(), now(), NULL);";
                dataProvider.ExcuteQuery(query);
            }

            // create messages table
            query = "CREATE TYPE MessageType AS ENUM ('text','file');";
            dataProvider.ExcuteQuery(query);
            
            query = "CREATE TABLE IF NOT EXISTS messages("
                +"Id SERIAL PRIMARY KEY,"
                +"Conversation_Id int,"
                +"Sender_Id BIGINT,"
                +"Message_Type MessageType,"
                +"Message varchar(255),"
                +"Attachment_url text,"
                +"Create_at timestamp,"
                +"Delete_at timestamp,"
                +"FOREIGN KEY (Conversation_Id) REFERENCES conversation(Id),"
                +"FOREIGN KEY (Sender_Id) REFERENCES Users(id)"
            +")";
            dataProvider.ExcuteQuery(query);

            // init message data
            query = "SELECT * FROM messages";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 1, 'text', N'Xin Chào', NULL, now());"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 5, 'text', N'Chào', NULL, now());"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 1, 'text', N'You are hero?', NULL, now());"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 5, 'text', N'I am not a hero, you?', NULL, now());"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (2, 5, 'text', N'Are you fine?', NULL, now());"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (2, 4, 'text', N'gg tonight', NULL, now());"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (2, 4, 'text', N'are you?', NULL, now());";
                dataProvider.ExcuteQuery(query);
            }

            // create participants table
            query = "CREATE TABLE IF NOT EXISTS participants("
                +"id SERIAL PRIMARY KEY,"
                +"Conversation_Id int,"
                +"Users_Id BIGINT,"
                +"FOREIGN KEY (Conversation_Id) REFERENCES conversation(Id),"
                +"FOREIGN KEY (Users_Id) REFERENCES Users(id)"
            +")";
            dataProvider.ExcuteQuery(query);

            // init participant data
            query = "SELECT * FROM participants";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO participants(Conversation_Id, Users_Id) VALUES (1, 1);"
                    +"INSERT INTO participants(Conversation_Id, Users_Id) VALUES (1, 5);"
                    +"INSERT INTO participants(Conversation_Id, Users_Id) VALUES (2, 4);"
                    +"INSERT INTO participants(Conversation_Id, Users_Id) VALUES (2, 5);"
                    +"INSERT INTO participants(Conversation_Id, Users_Id) VALUES (3, 3);"
                    +"INSERT INTO participants(Conversation_Id, Users_Id) VALUES (3, 5);";
                dataProvider.ExcuteQuery(query);
            }

            // create relation table
            query = "CREATE TYPE StateType AS ENUM ('requesting','friending');";
            dataProvider.ExcuteQuery(query);

            query = "CREATE TABLE IF NOT EXISTS relation("
                +"id SERIAL PRIMARY KEY,"
                +"Sender BIGINT,"
                +"Receiver BIGINT,"
                +"State StateType,"
                +"FOREIGN KEY (Sender) REFERENCES Users(id),"
                +"FOREIGN KEY (Receiver) REFERENCES Users(id)"
            +")";
            dataProvider.ExcuteQuery(query);

            // init relation table
            query = "SELECT * FROM relation";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO relation(Sender, Receiver, State) VALUES (5, 1, 'friending');"
                        +"INSERT INTO relation(Sender, Receiver, State) VALUES (5, 2, 'requesting');"
                        +"INSERT INTO relation(Sender, Receiver, State) VALUES (3, 5, 'friending');"
                        +"INSERT INTO relation(Sender, Receiver, State) VALUES (4, 5, 'friending');";
                dataProvider.ExcuteQuery(query);
            }
        }
        public void DropChatAppDB(){
            string query = "DROP TABLE IF EXISTS relation;"
            + "DROP TABLE IF EXISTS messages;"
            + "DROP TABLE IF EXISTS participants;"
            + "DROP TABLE IF EXISTS conversation;"
            + "DROP TABLE IF EXISTS useractive;"
            + "DROP TABLE IF EXISTS users;"
            + "DROP TYPE IF EXISTS MessageType;"
            + "DROP TYPE IF EXISTS StateType;";
            
            dataProvider.ExcuteQueryNonDB(query);
        }
    }
}