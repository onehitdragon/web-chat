const myBtnFacebookSignInElement = document.querySelector('.body > .body__main .other-login > div:nth-child(1)');

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1305191513323665',
        cookie     : true,
        xfbml      : true,
        version    : 'v13.0'
    });
    myBtnFacebookSignInElement.addEventListener('click', () => {
        FB.getLoginStatus((res) => {
            if(res.status == 'connected'){
                console.log(res);
                console.log('logged in fb');
                FB.api(
                    `/${res.authResponse.userID}?fields=name,picture`,
                    function (response) {
                      if (response && !response.error) {
                        let avatarUrl = response.picture.data.url;
                        let messageElement = messagePopup.createMessageElement(
                            avatarUrl,
                            'Thông báo',
                            'Bạn đã đăng nhập facebook',
                            () => {
                                mainElement.removeChild(messageElement);
                                window.location.href = '/Home';  
                            },
                            () => {
                                mainElement.removeChild(messageElement);
                                FB.logout();
                            }
                            ,
                            {
                                titleBtn1 : 'Tiếp tục',
                                titleBtn2 : 'Đăng xuất',
                                widthImage : '50px'
                            }
                        );
                        mainElement.appendChild(messageElement);
                      }
                    }
                );
            }
            if(res.status == 'not_authorized'){
                console.log('logged in fb but not authoried');
            }
            if(res.status == 'unknown'){
                FB.login((res) => {
                    if(res.status == 'connected'){
                        FB.api(
                            `/${res.authResponse.userID}?fields=name,picture`,
                            function (response) {
                              if (response && !response.error) {
                                let idUser = res.authResponse.userID;
                                let userFullName = response.name;
                                let avatarUrl = response.picture.data.url;
                                
                                // ajax
                                ajax.sendPOST('/Account/LoginFacebook', `IdUser=${idUser}&&FacebookName=${userFullName}&&AvatarUrl=${avatarUrl}`, (res) => {
                                    let messageElement;
                                    let data = JSON.parse(res.responseText);
                                    if(data.errorConnection){
                                        messageElement = messagePopup.createMessageElement(
                                            '/img/layout/fail.png',
                                            'Thông báo',
                                            'Lỗi kết nối',
                                            () => {
                                                mainElement.removeChild(messageElement);
                                            },
                                            () => {
                                                mainElement.removeChild(messageElement);
                                            }
                                        );
                                    }
                                    else{
                                        messageElement = messagePopup.createMessageElement(
                                            avatarUrl,
                                            'Thông báo',
                                            'Đăng nhập thành công',
                                            () => {
                                                mainElement.removeChild(messageElement);
                                                window.location.href = '/Home';
                                            },
                                            () => {
                                                
                                            },
                                            {
                                                hideCancer : true,
                                                widthImage : '50px'
                                            }
                                        );
                                    }
                                    mainElement.appendChild(messageElement);
                                });
                              }
                            }
                        );
                    }
                });
            }
        });
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));