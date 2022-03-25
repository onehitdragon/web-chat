class ConversationControl{
    static #instance;
    constructor(user, listConversation){
        if(ConversationControl.#instance){ 
            return ConversationControl.#instance;
        }
        ConversationControl.#instance = this;
        this.user = user;
        this.listConversation = listConversation;
        this.listConversationElement = [];
        this.conversationContainerElement = document.querySelector('.body-left__conversations');
        this.listMessageLoadingElement = [];
        this.socket = Socket.getInstance();
    }
    initConversation(){       
        this.listConversation.forEach((infoConversation, index) => {
            let conversation = new Conversation(this.user, infoConversation);
            // init conversation-item
            const conversationElement = conversation.CreateConversationElement();           
            this.listConversationElement.push(conversationElement);
            this.conversationContainerElement.appendChild(conversationElement);           
            //
            conversationElement.addEventListener('click', () => {
                if(this.listConversation[index] != this.activeConversation){
                    this.activeConversation = this.listConversation[index];
                    conversation = new Conversation(this.user, this.listConversation[index]);
                    this.activeConversationElement = conversation.CreateActiveConversationElement();
                    const activeConversationContainerElement = document.querySelector('.body > .body__main');   
                    activeConversationContainerElement.replaceChild(
                        this.activeConversationElement,
                        activeConversationContainerElement.querySelector('.body-right')
                    );
                    conversation.ScrollToLastMessage(this.activeConversationElement);  
                }
                this.#AddEventToInputChatElement();
                this.#AddEventToButtonChooseFileElement();
            });
        });
    }
    #AddEventToInputChatElement(){
        const inputChatElement = document.querySelector(".body-right__send > input[type='text']");
        inputChatElement.addEventListener('keydown', (e) => {
            if(e.key == 'Enter' && inputChatElement.value != ''){
                let contentMessage = inputChatElement.value;
                inputChatElement.value = "";
                let message = {
                    Sender : this.user,
                    TypeMessage : 0,
                    Content : contentMessage
                };
                this.SendMessage(message);
            }
            else{
                this.#Typing();
            }
        });
        inputChatElement.addEventListener("focus", () => {
            this.#Typing();
        });
        inputChatElement.addEventListener("blur", () => {
            this.#StopTyping();
        });
        window.addEventListener("beforeunload", () => {
            this.#StopTyping();
        })
    }
    SendMessage(message){
        this.activeConversation.Messages.push(message);
        this.#updateListConversation(this.activeConversation, {
            newMessage : false
        });
        this.listMessageLoadingElement.push(
            {
                messageElementId : this.listMessageLoadingElement.length + 1,
                message : message,
                messageElement : new Conversation(this.user, this.activeConversation).GetLastContentMessageElement()
            }
        );
        this.socket.invoke(
            'SendMessage',
            JSON.stringify(this.activeConversation),
            this.listMessageLoadingElement.length
        );
    }
    #AddEventToButtonChooseFileElement(){
        const buttonChooseFileElement = document.querySelector(".body-right__send > button[name='add-file']");
        const inputElement = buttonChooseFileElement.querySelector('input');
        buttonChooseFileElement.addEventListener('click', () => {       
            inputElement.click();
        });
        inputElement.addEventListener('input', () => {
            const file = inputElement.files[0];
            const formData = new FormData();
            formData.append('file', file);       
            this.SendFile(formData);
        });
    }
    SendFile(formData){
        const messageLoadingPopupElement = messagePopup.createMessageLoadingElement(
            'Đang tải...'
        );
        mainElement.appendChild(messageLoadingPopupElement);
        ajax.sendPOSTFile('/Home/SendFile', formData, (res) => {
            mainElement.removeChild(messageLoadingPopupElement);
            const fileAttachUrl = JSON.parse(res.responseText).fileAttachUrl;
            console.log(JSON.parse(res.responseText));
            let message = {
                Sender : this.user,
                TypeMessage : 1,
                Content : formData.get('file').name,
                FileAttachUrl : fileAttachUrl
            }
            this.SendMessage(message);
        });
    }
    #Typing(){
        this.socket.invoke(
            "Typing",
            JSON.stringify(this.activeConversation),
            true
        );
    }
    #StopTyping(){
        this.socket.invoke(
            "Typing",
            JSON.stringify(this.activeConversation),
            false
        );
    }
    initSocket(){
        this.socket.invoke(
            'Init', 
            JSON.stringify(
            {
                user : this.user,
                listConversation : this.listConversation
            })
        );
        this.socket.on('haveNewMessage', (json) => {
            let conversation = JSON.parse(json);
            this.#updateListConversation(conversation, {
                newMessage : true
            });

        });
        this.socket.on('serverReceivedMessage', (json) => {
            let messageElementId = JSON.parse(json);
            for(let i = 0; i < this.listMessageLoadingElement.length; i++){
                if(this.listMessageLoadingElement[i].messageElementId == messageElementId){
                    this.listMessageLoadingElement[i].message.loading = false;
                    Conversation.ReplaceStatusLoadingToMessageElement(
                        this.listMessageLoadingElement[i].messageElement
                    );
                }
            }
        });
        this.socket.on("typing", (json) => {
            let data = JSON.parse(json);
            this.#updateTypingConversation(data, true);
        })
        this.socket.on("stopTyping", (json) => {
            let data = JSON.parse(json);
            this.#updateTypingConversation(data, false);
        })
    }
    #updateListConversation(_conversation, options){
        const conversation = new Conversation(this.user, _conversation);
        for(let i = 0; i < this.listConversation.length; i++){
            if(this.listConversation[i].Id == _conversation.Id){
                this.listConversation[i] = _conversation;                
                this.listConversationElement[i] = conversation.AddUpdateLastMessageConversation(this.listConversationElement[i], options);
                break;
            }
        }
        if(this.activeConversation){
            if(this.activeConversation.Id == _conversation.Id){
                this.activeConversation = _conversation;
                conversation.AddUpdateMessageActiveConversationElement(this.activeConversationElement, options);
            }
        }
    }
    #updateTypingConversation(data, isTyping){
        let conversationTyping = data.conversationTyping;
        let senderTyping = data.senderTyping;
        for(let i = 0; i < this.listConversation.length; i++){
            if(this.listConversation[i].Id == conversationTyping.Id){   
                this.listConversation[i].Participants.forEach((participant, idx) => {
                    if(participant.Id == senderTyping.Id && participant.typing != isTyping){
                        this.listConversation[i].Participants[idx].typing = isTyping;
                        if(conversationTyping.Id == this.activeConversation.Id){
                            const conversation = new Conversation(this.user, this.listConversation[i]);
                            conversation.ReloadTypingConversation(this.activeConversationElement.querySelector('.body-right__messages'));
                            conversation.ScrollToLastMessage(this.activeConversationElement);
                        }
                    }
                })
                break;
            }
        }
    }
}