namespace project.Models.DataService{
    public class DataBaseInit{
        private static DataBaseInit instance;
        private DataBaseInit(){}
        public static DataBaseInit GetInstance(){
            if(instance == null){
                instance = new DataBaseInit();
            }
            return instance;
        }
        //
        public void InitChatAppDB(){
            DataProvider dataProvider = DataProvider.GetInstance();
            // create database
            string query = "CREATE DATABASE IF NOT EXISTS chatapp";
            dataProvider.ExcuteQueryNonDB(query);    

            // create user table
            query = "CREATE TABLE IF NOT EXISTS Users("
                +"id int PRIMARY KEY AUTO_INCREMENT,"
                +"FirstName VARCHAR(100) charset utf8,"
                +"LastName VARCHAR(100) charset utf8,"
                +"BirthDay date,"
                +"Gender int,"
                +"Email varchar(100),"
                +"Password varchar(100),"
                +"Phone varchar(13),"
                +"TimeCreated DateTime"
            +");";           
            dataProvider.ExcuteQuery(query);
            
            // init user data
            query = "SELECT * FROM Users";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'B',N'Nguyễn','1997/1/15',1,'B@gmail.com', '12345', '08614242451', CURRENT_TIMESTAMP());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'C',N'Trần','1999/5/23',0,'C@gmail.com', '12345', '08614242451', CURRENT_TIMESTAMP());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'G',N'Trần','2001/6/5',0,'G@gmail.com', '12345', '08614242451', CURRENT_TIMESTAMP());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'A',N'Ngọc','1999/2/16',1,'A@gmail.com', '12345', '08614242451', CURRENT_TIMESTAMP());"
                    +"INSERT INTO Users(FirstName, LastName, BirthDay, Gender, Email, Password, Phone, TimeCreated) VALUES(N'Z',N'Huỳnh','2005/11/29',0,'Z@gmail.com', '12345', '08614242451', CURRENT_TIMESTAMP());";
                dataProvider.ExcuteQuery(query);
            }

            //create active table
            query = "CREATE TABLE IF NOT EXISTS UserActive ("
                +"id int,"
                +"ActiveCode varchar(100),"
                +"FOREIGN KEY (id) REFERENCES users(id)"           
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
                +"Id int PRIMARY KEY AUTO_INCREMENT,"
                +"Title varchar(100) charset utf8,"
                +"Creator_Id int,"
                +"Create_at DateTime,"
                +"Update_at DateTime,"
                +"Delete_at DateTime,"
                +"FOREIGN KEY (Creator_Id) REFERENCES users(id)"
            +")";
            dataProvider.ExcuteQuery(query);

            //init conversation data
            query = "SELECT * FROM conversation";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'Nguyễn B', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);"
                    +"INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'Ngọc A', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);"
                    +"INSERT INTO conversation(Title, Creator_Id, Create_at, Update_at, Delete_at) VALUES (N'Trần G', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);";
                dataProvider.ExcuteQuery(query);
            }

            // create messages table
            query = "CREATE TABLE IF NOT EXISTS messages("
                +"Id int PRIMARY KEY AUTO_INCREMENT,"
                +"Conversation_Id int,"
                +"Sender_Id int,"
                +"Message_Type ENUM('text','file'),"
                +"Message varchar(255) charset utf8,"
                +"Attachment_url varchar(255),"
                +"Create_at DateTime,"
                +"Delete_at DateTime,"
                +"FOREIGN KEY (Conversation_Id) REFERENCES conversation(Id),"
                +"FOREIGN KEY (Sender_Id) REFERENCES users(id)"
            +")";
            dataProvider.ExcuteQuery(query);

            // init message data
            query = "SELECT * FROM messages";
            if(dataProvider.GetDataTable(query).Rows.Count == 0){
                query = "INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 1, 'text', N'Xin Chào', NULL, CURRENT_TIMESTAMP);"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 5, 'text', N'Chào Bạn', NULL, CURRENT_TIMESTAMP);"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 1, 'text', N'Bạn tên gì?', NULL, CURRENT_TIMESTAMP);"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (1, 5, 'text', N'Mình tên Z, còn bạn?', NULL, CURRENT_TIMESTAMP);"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (2, 5, 'text', N'Xin chào mình tên Z rất vui được gặp bạn!', NULL, CURRENT_TIMESTAMP);"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (2, 4, 'text', N'Mình cũng rất vui khi gặp bạn', NULL, CURRENT_TIMESTAMP);"
                    +"INSERT INTO messages(Conversation_Id, Sender_Id, Message_Type, Message, Attachment_url, Create_at) VALUES (2, 4, 'text', N'Mình tên Ngọc A', NULL, CURRENT_TIMESTAMP);";
                dataProvider.ExcuteQuery(query);
            }

            // create participants table
            query = "CREATE TABLE IF NOT EXISTS participants("
                +"id int PRIMARY KEY AUTO_INCREMENT,"
                +"Conversation_Id int,"
                +"Users_Id int,"
                +"FOREIGN KEY (Conversation_Id) REFERENCES conversation(Id),"
                +"FOREIGN KEY (Users_Id) REFERENCES users(id)"
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
            // query = "CREATE TABLE IF NOT EXISTS relations("
            //     +"`from` int(20) NOT NULL,"
            //     +"`to` int(20) NOT NULL,"
            //     +"`status` varchar(1) NOT NULL,"
            //     +"`since` datetime NOT NULL DEFAULT current_timestamp()"
            //     +");"
            //     +"ALTER TABLE `relations` ADD KEY `since` (`since`);"
            //     +"ALTER TABLE `relations` ADD FOREIGN KEY (`from`) REFERENCES users(`id`);"
            //     +"ALTER TABLE `relations` ADD FOREIGN KEY (`to`) REFERENCES users(`id`);";
            // dataProvider.ExcuteQuery(query);


        }  
    }
}