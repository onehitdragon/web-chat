import { forwardRef, useEffect, useState } from "react";

const InputChatArea = forwardRef(({sendTextMessage, sendTypingToServer}, ref) => {
    const [currentContent, setCurrentContent] = useState("");
    const [typing, setTyping] = useState(false);

    const handleOnChange = (e) => {
        setCurrentContent(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key === 'Enter' && currentContent !== ''){
            setTyping(false);
            sendTypingToServer(false)
            .then(() => {
                sendTextMessage(currentContent);
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
            <button type="button" name="icon">
                <i className="fa-solid fa-face-smile"></i>
            </button>
        </div>
    );
});

export default InputChatArea;