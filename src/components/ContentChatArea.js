import { memo, useEffect, useRef, useState } from 'react';
import MyMessage from './MyMessage';
import OpposideMessage from "./OpposideMessage";
import OpposideTypingMessage from './OpposideTypingMessage';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentConversaion, setScroll, updateStateFileMessage } from '../features/chat/conversationsSlice';
import checkFileType from '../tools/checkFileType';
import { loadIconPromise, loadImagePromise, loadMusicPromise, loadVideoPromise } from '../tools/LoadFilePromise';

function ContentChatArea(){
    const you = useSelector(state => state.you.info);
    const conversation = useSelector(selectCurrentConversaion);
    const listMessage = conversation.messages;
    const listTypingOpposide = conversation.participants.filter(participant => {
        return participant.typing;
    });
    const scroll = conversation.scroll;
    const dispatch = useDispatch();
    const bodyElement = useRef(null);
    const [loading, setLoading] = useState(true);
    const storageFireBase = useSelector(state => state.storageFireBase);
    
    useEffect(() => {
        Promise.all(listMessage.map((message) => {
            const type = checkFileType(message.fileAttachUrl);
            if(type !== "text" && type !== "other" && !message.loaded){
                if(type === "icon"){
                    return loadIconPromise(message);
                }
                if(type === "image"){
                    return loadImagePromise(message, storageFireBase);
                }
                if(type === "music"){
                    return loadMusicPromise(message, storageFireBase);
                }
                if(type === "video"){
                    return loadVideoPromise(message, storageFireBase);
                }
            }
            return undefined;
        }))
        .then((data) => {
            let isOnly = 0;
            data.forEach((messageLoaded) => {
                if(messageLoaded !== undefined){
                    dispatch(updateStateFileMessage({
                        idMessage: messageLoaded.message.id,
                        typeFile: messageLoaded.type,
                        src: messageLoaded.src,
                        loaded: true
                    }));
                    if(isOnly === 0 && messageLoaded.message.id === listMessage.at(-1).id){
                        if(messageLoaded.message.sender.id === you.id){
                            dispatch(setScroll(undefined));
                        }
                        else{
                            dispatch(setScroll(-1));
                        }
                    }
                    isOnly++;
                }
            });
            setLoading(false);
        });

        // eslint-disable-next-line
    }, [listMessage]);

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
        dispatch(setScroll(e.target.scrollTop));
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
                if(element.scrollTop > max - 200){
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

export default memo(ContentChatArea);