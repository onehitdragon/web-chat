console.log(conversationList);
console.log(user);
const conversationControl = new ConversationControl(user, conversationList);
conversationControl.initConversation();
const socket = Socket.getInstance();
socket.start().then(() => {
    conversationControl.initSocket();
});
