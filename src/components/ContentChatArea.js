import { useEffect, useRef } from 'react';
import MyMessage from './MyMessage';
import OpposideMessage from "./OpposideMessage";

function ContentChatArea({you, listMessage, scroll, handleScrollContentChat}){
    const bodyElement = useRef(null);

    const loadMessageNodes = () => {
        let previousId = -1;
        return listMessage.map((message, index) => {
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
    }

    const handleScroll = (e) => {
        handleScrollContentChat(e.target.scrollTop);
    }

    useEffect(() => {
        const element = bodyElement.current;
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
    });

    return (
        <div ref={bodyElement} className="body-right__messages" onScroll={handleScroll}>
            { loadMessageNodes() }
        </div>
    );
}

export default ContentChatArea;