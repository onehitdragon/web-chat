import MenuLeft from "./menuLeft.js";
import ConversationControl from "./conversationControl.js";
class Friend{
    constructor(friend){
        this.friend = friend;
    }
    createFriendElement(){
        const friendElement = document.createElement('div');
        friendElement.className = 'conversation-item';
        const avatarFriendElement = document.createElement('div');
        avatarFriendElement.className = 'avatar-area';
        const infoAreaElement = document.createElement('div');
        infoAreaElement.className = 'info-area';
        avatarFriendElement.innerHTML = `
            <img class="avatar" src="${this.friend.AvatarUrl ? this.friend.AvatarUrl : this.friend.avatarUrl}">
            <i class="fa-solid fa-circle icon-status--green"></i>
        `;
        infoAreaElement.innerHTML = `
            <p class="name">${(this.friend.LastName ? this.friend.LastName : this.friend.lastName) + ' ' + (this.friend.FirstName ? this.friend.FirstName : this.friend.firstName)}</p>
            <div class="friend">
                <span>Nhắn tin</span>
            </div>
        `;
        const btnMessage = infoAreaElement.querySelector('.friend');

        btnMessage.addEventListener('click', () => {
            MenuLeft.btnFriendElement.click();
            new ConversationControl().openConversationElement(this.friend);
        });

        friendElement.appendChild(avatarFriendElement);
        friendElement.appendChild(infoAreaElement);

        return friendElement;
    }
}
export default Friend;