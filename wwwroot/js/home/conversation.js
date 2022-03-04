class Conversation{
    constructor(infoConversation){
        this.amountParticipant = infoConversation.Participants.length;
        this.participant = infoConversation.Participants[0];
        this.avatarUrl = this.participant.AvatarUrl;
        this.fullname = this.participant.LastName + " " + this.participant.FirstName;
        this.lastMessage = infoConversation.Messages[infoConversation.Messages.length - 1];
        this.messages = infoConversation.Messages;
        this.myAvatarUrl = document.querySelector('.body-left__head > .avatar').src;
    }
    CreateConversationElement(){
        const conversationElement = document.createElement('div');
        conversationElement.className = 'conversation-item';
        const avatarAreaElement = document.createElement('div');
        avatarAreaElement.className = 'avatar-area';
        const infoAreaElement = document.createElement('div');
        infoAreaElement.className = 'info-area';
        const lastMesElement = document.createElement('p');
        lastMesElement.className = 'last-mes';
        const statusAreaElement = document.createElement('div');
        statusAreaElement.className = 'status-area';

        if(this.amountParticipant == 1){
            avatarAreaElement.innerHTML = `
                <img class="avatar" src="${this.avatarUrl}">
                <i class="fa-solid fa-circle icon-status--green"></i>
            `;
            infoAreaElement.innerHTML = `
                <p class="name">${this.fullname}</p>
            `;
            statusAreaElement.innerHTML = `
                <p class="time">
                    <i class="fa-solid fa-check"></i>
                    <span>11:45 PM</span>
                </p>
                <i class="fa-solid fa-circle">
                    <span>1</span>
                </i>
            `;
        }
        if(!this.lastMessage){
            lastMesElement.innerText = "Chưa có tin nhắn";
        }
        else if(this.lastMessage.Sender){
            lastMesElement.innerText = this.fullname + ': ';
            lastMesElement.innerText += this.lastMessage.Content;
        }
        else{
            lastMesElement.innerText = 'Bạn: ';
            lastMesElement.innerText += this.lastMessage.Content;
        }       
        infoAreaElement.appendChild(lastMesElement);

        conversationElement.appendChild(avatarAreaElement);
        conversationElement.appendChild(infoAreaElement);
        conversationElement.appendChild(statusAreaElement);

        return conversationElement;
    }
    CreateActiveConversationElement(){
        const conversationElement = document.createElement('div');
        conversationElement.className = 'body-right';
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
        let previousMessageElement;
        this.messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            const currentSenderId = message.Sender ? message.Sender.Id : -1;

            if(!previousSenderId || previousSenderId != currentSenderId){
                if(message.Sender){
                    messageElement.innerHTML = `
                        <img class="avatar" src="${message.Sender.AvatarUrl}">
                        <div class="content">
                            <p>${message.Content}</p>
                            <div class="name-time">
                                <span class="name">User demo</span>
                                <i class="fa-solid fa-circle"></i>
                                <span class="time">9:30 PM</span>
                            </div>
                        </div>
                    `;
                    previousSenderId = message.Sender.Id;
                }
                else{
                    messageElement.classList.add('message--mymessage');
                    messageElement.innerHTML = `
                        <img class="avatar" src="${this.myAvatarUrl}">
                        <div class="content">
                            <p>${message.Content}</p>
                            <div class="name-time">
                                <span class="name">User demo</span>
                                <i class="fa-solid fa-circle"></i>
                                <span class="time">9:30 PM</span>
                            </div>
                        </div>
                    `;
                    previousSenderId = -1;
                }
                previousMessageElement = messageElement;
                messageContainerElement.appendChild(messageElement);
            }
            else{
                previousMessageElement.querySelector('.content > .name-time').insertAdjacentHTML('beforebegin',`
                    <p>${message.Content}</p>
                `);
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
        conversationElement.appendChild(headConversationElement);
        conversationElement.appendChild(messageContainerElement);
        conversationElement.appendChild(buttonConversationElement);

        return conversationElement;
    }
}