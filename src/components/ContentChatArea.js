import { useEffect, useRef, useState } from 'react';
import MyMessage from './MyMessage';
import OpposideMessage from "./OpposideMessage";
import OpposideTypingMessage from './OpposideTypingMessage';

function ContentChatArea({you, listMessage, scroll, handleScrollContentChat, listTypingOpposide}){
    const bodyElement = useRef(null);
    const [loading, setLoading] = useState(true);

    const loadAllImage = () => {
        const loadImagePromise = (imageSrc) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = imageSrc;
                img.onload = () => {
                    setTimeout(() => {
                        resolve();
                    }, 500);
                }
            });
        }
        Promise.all(listMessage.map(message => {
            if(message.fileAttachUrl.includes("/img/icons/")){
                return loadImagePromise(message.fileAttachUrl);
            }
            return "";
        }))
        .then(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        loadAllImage();

        // eslint-disable-next-line
    }, []);

    const loadMessageNodes = () => {
        let previousId = -1;
        const listMessageNodes = listMessage.map((message, index) => {
            let sender = message.sender;
            let addTime = (listMessage[index + 1] === undefined || listMessage[index + 1].sender.id !== sender.id);
            if(you.id === sender.id){
                if(sender.id !== previousId){
                    previousId = sender.id;
                    return <MyMessage key={message.netId || message.id} message={ message } displayAvatar displayTime={ addTime }/>
                }
                else{
                    return <MyMessage key={message.netId || message.id} message={ message } displayTime={ addTime }/>
                }
            }
            else{
                if(sender.id !== previousId){
                    previousId = sender.id;
                    return <OpposideMessage key={message.id} message={ message } displayAvatar displayTime={ addTime }/>
                }
                else{
                    return <OpposideMessage key={message.id} message={ message } displayTime={ addTime }/>
                }
            }
        });
        
        return listMessageNodes;
    }

    const loadTypingMessageNodes = () => {
        const listTypingMessageNodes = listTypingOpposide.map(opposide => {
            return <OpposideTypingMessage key = {opposide.id}/>;
        });

        return listTypingMessageNodes;
    }

    const handleScroll = (e) => {
        handleScrollContentChat(e.target.scrollTop);
    }

    useEffect(() => {
        if(!loading){
            const element = bodyElement.current;
            element.classList.remove("body-right__messages--hide-messages");
            if(scroll === undefined){
                element.scroll(0, element.scrollHeight);
            }
            else if(scroll === -1){ // when receive message
                const max = element.scrollHeight - element.clientHeight;
                if(element.scrollTop > max - 100){
                    element.scroll(0, element.scrollHeight);
                }
            }
            else{
                element.scroll(0, scroll);
            }
        } 
    });

    return (
        <div ref={bodyElement}
            className={"body-right__messages body-right__messages--hide-messages"}
            onScroll={ handleScroll }
            >
            {!loading && loadMessageNodes() }
            {!loading && loadTypingMessageNodes() }
            {loading && 
                <div className='message-loading-area'>
                    <div className='road'>
                        <img src='/img/icons/something.gif' alt='error'/>
                    </div>
                    <div className="message-loading">
                        <div className="content">
                            <div className='content__mes'>
                                <p className="loading">
                                    <i className="fa-solid fa-circle"></i>
                                    <i className="fa-solid fa-circle"></i>
                                    <i className="fa-solid fa-circle"></i>
                                </p>
                            </div>
                            <div className="name-time"></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ContentChatArea;