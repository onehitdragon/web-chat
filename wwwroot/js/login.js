const formLoginElement = document.querySelector('.body > .body__main .login-form');
const inputEmailElement = document.querySelector(".body > .body__main .login-form > .login-form__row > input[name='Email']");
const inputPasswordElement = document.querySelector(".body > .body__main .login-form > .login-form__row > input[name='Password']");
const btnLoginElement = document.querySelector(".body > .body__main .login-form > button[type='button']");
const loaddingImageElement = document.querySelector('.body > .body__main .login-form .loading');

// init ui
formLoginElement.removeChild(loaddingImageElement);
//

const ajax = new Ajax();

btnLoginElement.addEventListener('click', () => {
    // ui
    formLoginElement.removeChild(btnLoginElement);
    formLoginElement.appendChild(loaddingImageElement);
    //
    let email = inputEmailElement.value;
    let password = inputPasswordElement.value;
    ajax.sendPOST('/Account/Login', `Email=${email}&&Password=${password}`, (res) => {
        let data = JSON.parse(res.responseText);
        
    });
    
});
