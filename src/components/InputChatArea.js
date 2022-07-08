import { forwardRef, useEffect, useState } from "react";
import IconChatArea from "./IconChatArea";
import { useDispatch } from "react-redux";

const InputChatArea = forwardRef(({currentConversation, sendTypingToServer}, ref) => {
    const [currentContent, setCurrentContent] = useState("");
    const [typing, setTyping] = useState(false);
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setCurrentContent(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key === 'Enter' && currentContent !== ''){
            setTyping(false);
            sendTypingToServer(false)
            .then(() => {
                dispatch({
                    type: "sendTextMessage",
                    content: currentContent,
                    currentConversation: currentConversation
                });
                currentConversation.scroll = undefined;
            });
            setCurrentContent('');
        }
    }

    const handleOnBlur = () => {
        if(typing){
            setTyping(false);
            sendTypingToServer(false);
        }
    }

    useEffect(() => {
        if(currentContent !== "" && !typing){
            setTyping(true);
            sendTypingToServer(true);
        }

        // eslint-disable-next-line
    }, [currentContent]);

    return (
        <div className="body-right__send">
            <button type="button" name="add-file">
                <i className="fa-solid fa-circle-plus"></i>
            </button>
            <input ref={ ref } type="text" placeholder="Nhập tin nhắn..." 
                value={ currentContent }
                onChange={ handleOnChange }
                onKeyDown={ handleSendMessage }
                onBlur={ handleOnBlur }
            />
            <IconChatArea />
        </div>
    );
});

export default InputChatArea;