// random bg
const htmlElement = document.querySelector('html');

let randomBackground = new RamdomBackground();
htmlElement.style = `background-image: url('/img/layout/${randomBackground.getBackGroundName()}');`;

// google sign in
// const myBtnGoogleSignInElement = document.querySelector('.body > .body__main .other-login > div:nth-child(2)');
// let btnGoogleSignInElement;

// myBtnGoogleSignInElement.addEventListener('click', () => {
//     console.log('click');
//     btnGoogleSignInElement.querySelector('span').click();  
// });

// function onSuccess(googleUser) {
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
// function onFailure(error) {
//     console.log(error);
// }
// function renderButton() {
//     gapi.load('auth2', function() {
//         gapi.auth2.init({
//             client_id: '534298276644-p69i2p8u2qjqdfgfbl168li06c4m0msg.apps.googleusercontent.com'
//         })
//         .then(() => {
//             console.log('init google auth');
//             btnGoogleSignInElement = document.querySelector('#g-signin2');
//         });
//     });
//     gapi.signin2.render('g-signin2', {
//         'onsuccess': onSuccess,
//         'onfailure': onFailure
//     });
// }