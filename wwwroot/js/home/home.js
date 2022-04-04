import ConversationControl from './conversationControl.js';
import Socket from './socket.js';
import FriendControl from './friendControl.js';
console.log(conversationList);
console.log(user);
console.log(friendList);
const conversationControl = new ConversationControl(user, conversationList);
conversationControl.initConversation();
const socket = Socket.getInstance();
socket.start().then(() => {
    conversationControl.initSocket();
});
const friendControl = new FriendControl(friendList);
