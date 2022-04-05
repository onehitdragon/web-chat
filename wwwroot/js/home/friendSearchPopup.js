import {ajax} from '../init.js';
class FriendSearchPopup{
    constructor(){

    }
    createFriendSearchPopup(){
        const friendSearchElement = document.createElement('div');
        friendSearchElement.id = 'friend-search-area';
        friendSearchElement.innerHTML = `
            <div class='friend-search-main'>
                <div class='title'>
                    <span>Thêm bạn</span>
                    <button name='close-friend-search'>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class='input-area'>
                    <div class='input-area__search'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <div class='input'>
                            <input placeholder='Nhập tên, số điện thoại...'/>
                        </div>
                        <p class='line'></p>
                        <div class='list-search'>
                            <div class='body-left__conversations'>
                                
                            </div>
                        </div>
                        <i></i>
                    </div>
                </div>
                <div class='list-requesting-area'>
                    <div class='title'>
                        <span>Lời mời kết bạn</span>
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                    <div class='list-requesting'>
                        <div class='body-left__conversations'>

                        </div>
                    </div>
                </div>
            </div>
        `;

        friendSearchElement.querySelector('.input-area > .input-area__search > .input > input').addEventListener('input', (e) => {
            const key = e.target.value;
            ajax.sendGET(`/Friend/SearchFriend?key=${key}`, (res) => {
                friendSearchElement.querySelector('.list-search').innerHTML = '';
                friendSearchElement.querySelector('.list-search').appendChild(
                    this.#createResultFriendSearchElement(JSON.parse(res.responseText))
                );
            })
        });
        for(let i = 0; i < 10; i++){
            const friendElement = document.createElement('div');
            friendElement.className = 'conversation-item';
            const avatarFriendElement = document.createElement('div');
            avatarFriendElement.className = 'avatar-area';
            const infoAreaElement = document.createElement('div');
            infoAreaElement.className = 'info-area';

            avatarFriendElement.innerHTML = `
                <img class="avatar" src="/img/layout/default-avatar.jpg">
            `;
            infoAreaElement.innerHTML = `
                <p class="name">Nguyễn A</p>
                <div class="friend">
                    <span>Đồng ý</span>
                </div>
            `;

            friendElement.appendChild(avatarFriendElement);
            friendElement.appendChild(infoAreaElement);

            friendSearchElement.querySelector('.list-requesting > .body-left__conversations').appendChild(friendElement);
        }

        return friendSearchElement;
    }
    #createResultFriendSearchElement(listUser){
        const containerElement = document.createElement('div');
        containerElement.className = 'body-left__conversations';

        listUser.forEach((user) => {
            containerElement.appendChild(this.#createItemFriendSearchElement(user));
        });
        return containerElement;
    }
    #createItemFriendSearchElement(user){
        const friendElement = document.createElement('div');
        friendElement.className = 'conversation-item';
        const avatarFriendElement = document.createElement('div');
        avatarFriendElement.className = 'avatar-area';
        const infoAreaElement = document.createElement('div');
        infoAreaElement.className = 'info-area';

        avatarFriendElement.innerHTML = `
            <img class="avatar" src="${user.avatarUrl}">
        `;
        infoAreaElement.innerHTML = `
            <p class="name">${user.lastName + ' ' + user.firstName}</p>
            <div class="friend">
                <span>Kết bạn</span>
            </div>
        `;

        friendElement.appendChild(avatarFriendElement);
        friendElement.appendChild(infoAreaElement);

        return friendElement;
    }
}
export default FriendSearchPopup;