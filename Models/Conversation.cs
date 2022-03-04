using System;
using System.Collections.Generic;
namespace project.Models{
    public class Conversation{
        private int id;
        private string title;
        private int creatorId;
        private List<User> participants;
        private List<Message> messages;
        public int Id{
            get{
                return id;
            }
            set{
                id = value;
            }
        }
        public string Title{
            get{
                return title;
            }
            set{
                title = value;
            }
        }
        public int CreatorId{
            get{
                return creatorId;
            }
            set{
                creatorId = value;
            }
        }
        public List<User> Participants{
            get{
                return participants;
            }
            set{
                participants = value;
            }
        }
        public List<Message> Messages{
            get{
                return messages;
            }
            set{
                messages = value;
            }
        }
        public Conversation(int id, string title, int creatorId, List<User> idParticipants, List<Message> messages){
            this.id = id;
            this.title = title;
            this.creatorId = creatorId;
            this.participants = idParticipants;
            this.messages = messages;
        }
    }
}