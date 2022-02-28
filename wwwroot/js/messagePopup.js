class MessagePopup{
    constructor(){
        
    }
    createMessageElement(srcImg = '~/img/layout/fail0.png', title, content, agreeCallBack, cancerCallBack, options = {}){
        // init
        if(!options.titleBtn1){
            options.titleBtn1 = 'Đồng ý';
        }
        if(!options.titleBtn2){
            options.titleBtn2 = 'Hủy';
        }
        if(!options.widthImage){
            options.widthImage = '100px';
        }
        //
        let messageElement = document.createElement('div');
        messageElement.id = 'message-popup';
        messageElement.innerHTML = `
            <div class="container">
                <img src="${srcImg}"></img>
                <p class="title">${title}</p>
                <p class="content">${content}</p>
                <div class="buttons">
                    <button type="button">${options.titleBtn1}</button>
                    <button class="button--gray" type="button">${options.titleBtn2}</button>
                </div>
            </div>
        `;
        const btnsElement = messageElement.querySelector('.container > .buttons')
        const btnAgreeElement = messageElement.querySelector('.container > .buttons > button:first-child');
        const btnCancerElement = messageElement.querySelector('.container > .buttons > button:last-child');
        btnAgreeElement.addEventListener('click', agreeCallBack);
        btnCancerElement.addEventListener('click', cancerCallBack);

        if(options.hideCancer){
            btnsElement.removeChild(btnCancerElement);
        }
        const imgElement = messageElement.querySelector('.container > img');
        imgElement.style = `width: ${options.widthImage};`;

        return messageElement;
    }
}