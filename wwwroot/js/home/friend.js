class Friend{
    constructor(friend){
        this.friend = friend;
        this.fullname = friend.LastName + " " + friend.FirstName;
    }
    createFriendElement(){
        const friendElement = document.createElement('div');
        friendElement.className = 'conversation-item';
        const avatarFriendElement = document.createElement('div');
        avatarFriendElement.className = 'avatar-area';
        const infoAreaElement = document.createElement('div');
        infoAreaElement.className = 'info-area';

        avatarFriendElement.innerHTML = `
            <img class="avatar" src="${this.friend.AvatarUrl}">
            <i class="fa-solid fa-circle icon-status--green"></i>
        `;
        infoAreaElement.innerHTML = `
            <p class="name">${this.fullname}</p>
            <div class="friend">
                <span>Bạn bè</span>
            </div>
        `;

        friendElement.appendChild(avatarFriendElement);
        friendElement.appendChild(infoAreaElement);

        return friendElement;
    }
}