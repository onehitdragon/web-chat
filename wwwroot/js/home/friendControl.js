import Friend from "./friend.js";
class FriendControl{
    static #instance;
    constructor(listFriend){
        if(FriendControl.#instance){
            return FriendControl.#instance;
        }
        FriendControl.#instance = this;
        this.listFriend = listFriend;
        this.containerFriendElement = document.createElement('div');
        this.containerFriendElement.className = 'body-left__conversations';
        listFriend.forEach((_friend) => {
            const friend = new Friend(_friend);
            this.containerFriendElement.appendChild(friend.createFriendElement());
        });
    }
    showListFriend(){
        document.querySelector('.body-left').replaceChild(
            this.containerFriendElement,
            document.querySelector('.body-left__conversations')
        );
    }
}
export default FriendControl;