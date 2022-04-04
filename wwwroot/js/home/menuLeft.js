import ConversationControl from "./conversationControl.js";
import FriendControl from "./friendControl.js";
class MenuLeft{
    static #isOpenFriend = false;
    constructor(){
        const bodyLeftHead = document.querySelector('.body-left__head');
        const menuLeftElement = document.createElement('div');
        menuLeftElement.className = 'menu-left';
        menuLeftElement.innerHTML = `
            <div class='menu-main'>
                <button name='friend'>
                    <i class="fa-solid fa-user-group"></i>
                </button>
                <button name='friend-search'>
                    <i class="fa-solid fa-user-plus"></i>
                </button>
                <button name='create-group'>
                    <i class="fa-solid fa-users"></i>
                </button>
                <button name='setting'>
                    <i class="fa-solid fa-gear"></i>
                </button>
                <button name='youtube'>
                    <i class="fa-brands fa-youtube"></i>
                </button>
                <button name='discord'>
                    <i class="fa-brands fa-discord"></i>
                </button>
            </div>
        `;
        const btnMenuElement = bodyLeftHead.querySelector('.menu-button');
        const iconOpenElement = btnMenuElement.querySelector('i');
        const iconCloseElement = document.createElement('i');
        iconCloseElement.className = 'fa-solid fa-xmark close';
        const btnFriendElement = menuLeftElement.querySelector("button[name='friend']");
        const btnFriendSearchElement = menuLeftElement.querySelector("button[name='friend-search']");
        const btnCreateGroupElement = menuLeftElement.querySelector("button[name='create-group']");
        const btnSettingElement = menuLeftElement.querySelector("button[name='setting']");
        const btnYoutubeElement = menuLeftElement.querySelector("button[name='youtube']");
        const btnDiscordElement = menuLeftElement.querySelector("button[name='discord']");

        const closeMenu = () => {
            setTimeout(() => {
                bodyLeftHead.removeChild(menuLeftElement);
                btnMenuElement.replaceChild(iconOpenElement, iconCloseElement);
                menuLeftElement.querySelector('.menu-main').querySelectorAll('button').forEach((e) => {
                    e.classList.remove('close');
                });
            }, 250);
            menuLeftElement.querySelector('.menu-main').querySelectorAll('button').forEach((e) => {
                e.classList.add('close');
            });
        }
        const openMenu = () => {
            bodyLeftHead.appendChild(menuLeftElement);
            btnMenuElement.replaceChild(iconCloseElement, iconOpenElement);
        }
        btnMenuElement.addEventListener('click', (e) => {
            if(bodyLeftHead.contains(menuLeftElement)) closeMenu()
            else openMenu();
            e.stopPropagation();
        });
        document.addEventListener('click', () => {
            if(bodyLeftHead.contains(menuLeftElement)) closeMenu();
        });
        
        btnFriendElement.addEventListener('click', () => {
            const friendControl = new FriendControl();
            const conversationControl = new ConversationControl();
            if(!MenuLeft.#isOpenFriend){
                friendControl.showListFriend();
                btnFriendElement.querySelector('i').classList.replace('fa-user-group','fa-comment');
            }
            else{
                conversationControl.reInitConversation();
                btnFriendElement.querySelector('i').classList.replace('fa-comment','fa-user-group');
            }
            MenuLeft.#isOpenFriend = !MenuLeft.#isOpenFriend;
        });
        btnFriendSearchElement.addEventListener('click', () => {
            
        });
        btnCreateGroupElement.addEventListener('click', () => {
            
        });
        btnSettingElement.addEventListener('click', () => {
            
        });
        btnYoutubeElement.addEventListener('click', () => {
            window.open('https://www.youtube.com/channel/UClN-6RYy1Dvr1eAUTqn8HgQ');
        });
        btnDiscordElement.addEventListener('click', () => {
            window.open('https://discord.com/channels/732240768210567220/732240768210567223');
        });
    }
}
export default MenuLeft;