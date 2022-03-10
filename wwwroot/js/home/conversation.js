class Conversation{
    constructor(user, infoConversation){
        this.user = user;
        this.amountParticipant = infoConversation.Participants.length;
        infoConversation.Participants.forEach((participant) => {
            if(participant.Id != this.user.Id){
                this.participant = participant;
            }
        });
        this.avatarUrl = this.participant.AvatarUrl;
        this.fullname = this.participant.LastName + " " + this.participant.FirstName;
        this.lastMessage = infoConversation.Messages[infoConversation.Messages.length - 1];
        this.messages = infoConversation.Messages;
        this.myAvatarUrl = document.querySelector('.body-left__head > .avatar').src;
    }
    CreateConversationElement(newMessage){
        const conversationElement = document.createElement('div');
        conversationElement.className = 'conversation-item';
        const avatarAreaElement = document.createElement('div');
        avatarAreaElement.className = 'avatar-area';
        const infoAreaElement = document.createElement('div');
        infoAreaElement.className = 'info-area';
        const statusAreaElement = document.createElement('div');
        statusAreaElement.className = 'status-area';

        if(this.amountParticipant == 2){
            avatarAreaElement.innerHTML = `
                <img class="avatar" src="${this.avatarUrl}">
                <i class="fa-solid fa-circle icon-status--green"></i>
            `;
            infoAreaElement.innerHTML = `
                <p class="name">${this.fullname}</p>
                <p class="last-mes"></p>
            `;
            statusAreaElement.innerHTML = `
                <p class="time">
                    <i class="fa-solid fa-check"></i>
                    <span>11:45 PM</span>
                </p>
            `;
        }

        conversationElement.appendChild(avatarAreaElement);
        conversationElement.appendChild(infoAreaElement);
        conversationElement.appendChild(statusAreaElement);
        this.AddUpdateLastMessageConversation(conversationElement, newMessage);

        return conversationElement;
    }
    AddUpdateLastMessageConversation(conversationElement, options = {}){       
        const lastMesElement = conversationElement.querySelector('.info-area > .last-mes');
        if(!this.lastMessage){
            lastMesElement.innerText = "Chưa có tin nhắn";
        }
        else if(this.lastMessage.Sender.Id != this.user.Id){
            lastMesElement.innerText = this.fullname + ': ' + this.lastMessage.Content;
        }
        else{
            lastMesElement.innerText = 'Bạn: ' + this.lastMessage.Content;
        }
        if(options.newMessage){
            const statusAreaElement = conversationElement.querySelector('.status-area');
            if(statusAreaElement.querySelector('.status')){
                const spanElement = statusAreaElement.querySelector('i > span');
                spanElement.innerText = parseInt(spanElement.textContent) + 1;
            }
            else{
                const newStatusMessageElement = document.createElement('i');
                newStatusMessageElement.className = 'fa-solid fa-circle status';
                newStatusMessageElement.innerHTML = '<span>1</span>'
                statusAreaElement.appendChild(newStatusMessageElement);
            }
        }

        return conversationElement;
    }
    CreateActiveConversationElement(){
        const activeConversationElement = document.createElement('div');
        activeConversationElement.className = 'body-right';
        const bodyRightBeforeElement = document.createElement('div');
        bodyRightBeforeElement.className = 'body-right__before';
        const headConversationElement = document.createElement('div');
        headConversationElement.className = 'body-right__head';
        const messageContainerElement = document.createElement('div');
        messageContainerElement.className = 'body-right__messages';
        const buttonConversationElement = document.createElement('div');
        buttonConversationElement.className = 'body-right__send';

        headConversationElement.innerHTML = `
            <img class="avatar" src="${this.avatarUrl}">
            <div class="info-area">
                <p class="name">${this.fullname}</p>
                <p class="status">Đang gõ...</p>
            </div>
            <div class="button-area">
                <button type="button" name="profile">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <button type="button" name="menu">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        `;
        let previousSenderId;
        this.messages.forEach((message) => {
            const currentSenderId = message.Sender.Id;
            
            if(!previousSenderId || previousSenderId != currentSenderId){
                if(message.Sender.Id != this.user.Id){
                    messageContainerElement.appendChild(
                        this.CreateFileMessage(message)
                    ); 
                }
                else{
                    messageContainerElement.appendChild(
                        this.CreateMyMessage(message)
                    );
                }
                previousSenderId = currentSenderId;
            }
            else{
                const previousMessageElement = messageContainerElement.lastChild;
                this.AddMessageToPreviousMessageElement(message, previousMessageElement);
            }

            if(message.loading){
                this.AddStatusLoadingToLastMessageElement(messageContainerElement);
            }
            else if(message.loading == false){
                this.AddStatusSuccessToLastMessageElement(messageContainerElement);
            }
        });
        buttonConversationElement.innerHTML = `
            <button type="button" name="add-file">
                <i class="fa-solid fa-circle-plus"></i>
            </button>
            <input type="text" placeholder="Nhập tin nhắn...">
            <button type="button" name="icon">
                <i class="fa-solid fa-face-smile"></i>
            </button>
        `;
        activeConversationElement.appendChild(bodyRightBeforeElement);
        activeConversationElement.appendChild(headConversationElement);
        activeConversationElement.appendChild(messageContainerElement);
        activeConversationElement.appendChild(buttonConversationElement);

        return activeConversationElement;
    }
    CreateMessage(message){
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <img class="avatar" src="${message.Sender.AvatarUrl}">
            <div class="content">
                <div class='content__mes'>
                    <p>${message.Content}</p>
                </div>
                <div class="name-time">
                    <span class="name">User demo</span>
                    <i class="fa-solid fa-circle"></i>
                    <span class="time">9:30 PM</span>
                </div>
            </div>
        `;
        return messageElement;
    }
    CreateFileMessage(message){
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <img class="avatar" src="${message.Sender.AvatarUrl}">
            <div class="content">
                <div class='content__mes'>
                    <img src='https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg'>
                </div>
                <div class="name-time">
                    <span class="name">User demo</span>
                    <i class="fa-solid fa-circle"></i>
                    <span class="time">9:30 PM</span>
                </div>
            </div>
        `;
        return messageElement;
    }
    CreateMyMessage(message){
        const messageElement = this.CreateMessage(message);
        messageElement.classList.add('message--mymessage');
        return messageElement;
    }
    AddMessageToPreviousMessageElement(message, previousMessageElement){
        previousMessageElement.querySelector('.content > .name-time').insertAdjacentHTML('beforebegin',`
            <div class='content__mes'>
                <p>${message.Content}</p>
            </div>
        `);
    }
    AddUpdateMessageActiveConversationElement(activeConversationElement, options = {}){
        const previousMessage = this.messages[this.messages.length - 2];
        const newMessage = this.messages[this.messages.length - 1];
        const messageContainerElement = activeConversationElement.querySelector('.body-right__messages');
        if(newMessage.Sender.Id != previousMessage.Sender.Id){
            if(newMessage.Sender.Id != this.user.Id){
                messageContainerElement.appendChild(
                    this.CreateMessage(newMessage)
                );
            }
            else{
                messageContainerElement.appendChild(
                    this.CreateMyMessage(newMessage)
                );
            }
        }
        else{
            const previousMessageElement = messageContainerElement.lastChild;
            this.AddMessageToPreviousMessageElement(newMessage, previousMessageElement);
        }

        if(!options.newMessage){
            newMessage.loading = true;
            this.AddStatusLoadingToLastMessageElement(messageContainerElement);
        }
        messageContainerElement.querySelector('.message:last-child').scrollIntoView();
    }
    AddStatusLoadingToLastMessageElement(messageContainerElement){
        let contentMesLastElement = messageContainerElement.querySelectorAll('.message:last-child > .content .content__mes');
        contentMesLastElement = contentMesLastElement[contentMesLastElement.length - 1];
        if(!contentMesLastElement.querySelector('.status-load')){
            contentMesLastElement.insertAdjacentHTML('beforeend', '<i class="status-load fa-solid fa-circle-notch"></i>');
        }
    }
    AddStatusSuccessToLastMessageElement(messageContainerElement){
        let contentMesLastElement = messageContainerElement.querySelectorAll('.message:last-child > .content .content__mes');
        contentMesLastElement = contentMesLastElement[contentMesLastElement.length - 1];
        if(!contentMesLastElement.querySelector('.status-load')){
            contentMesLastElement.insertAdjacentHTML('beforeend', '<i class="status-success fa-solid fa-check"></i>');
        }
    }
    static GetLastMessageElement(){
        let contentMesLastElement = document.querySelectorAll('.body-right__messages > .message:last-child > .content > .content__mes');
        contentMesLastElement = contentMesLastElement[contentMesLastElement.length - 1];
        return contentMesLastElement;
    }
    static ReplaceStatusLoadingToLastMessageElement(contentMesLastElement){
        const statusSuccessElement = document.createElement('i');
        statusSuccessElement.className = 'status-success fa-solid fa-check';
        contentMesLastElement.replaceChild(
            statusSuccessElement,
            contentMesLastElement.querySelector('i')
        );
    }
}