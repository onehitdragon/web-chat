console.log(conversationList);
console.log(user);
const conversationControl = new ConversationControl(user, conversationList);
conversationControl.init();
conversationControl.startSocket();
