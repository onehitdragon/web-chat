class ConversationControl{
    constructor(listConversation){
        this.listConversation = listConversation;
    }
    init(){
        const conversationContainerElement = document.querySelector('.body-left__conversations');
        const activeConversationContainerElement = document.querySelector('.body > .body__main');

        this.listConversation.forEach((infoConversation) => {
            const conversation = new Conversation(infoConversation);
            conversationContainerElement.appendChild(
                conversation.CreateConversationElement()
            )
            .addEventListener('click', () => {
                if(this.activeConversation != infoConversation){
                    this.activeConversation = infoConversation;    
                    activeConversationContainerElement.replaceChild(
                        conversation.CreateActiveConversationElement(),
                        activeConversationContainerElement.querySelector('.body-right')
                    );  
                }
                const inputChatElement = document.querySelector(".body-right__send > input[type='text']");
                inputChatElement.addEventListener('keydown', (e) => {
                    let contentMessage = inputChatElement.value;
                    if(e.key == 'Enter' && contentMessage != ''){
                        console.log("send " + contentMessage);
                        let message = {
                            TypeMessage : 0,
                            Content : contentMessage
                        };
                        this.activeConversation.Messages.push(message);
                        this.socket.send(JSON.stringify(
                            {
                                type : 'sendMessage',
                                message : JSON.stringify(message)
                            }
                        ));
                    }
                });
            });
        });
    }
    startSocket(){
        this.socket = new WebSocket('ws://127.0.0.1:12345/Conversation');
        this.socket.onopen = () => {
            console.log("conected success");
        }
        this.socket.onerror = (e) => {
            console.log(e);
        }
        this.socket.onmessage = (mes) => {
            console.log(mes.data);
            let data = JSON.parse(mes.data);

            if(data.type == 'handshake'){
                this.socket.send(JSON.stringify(
                    {
                        type : 'init',
                        listConversation : JSON.stringify(this.listConversation)
                    }
                ));
            }
        }
    }
}