import { useEffect, useRef, useState } from "react";

function InputChatArea({sendTextMessage}){
    const [currentContent, setCurrentContent] = useState("");
    const inputChatElement = useRef(null);

    const handleOnChange = (e) => {
        setCurrentContent(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key === 'Enter' && currentContent !== ''){
            sendTextMessage(currentContent);
            setCurrentContent('');
        }
    }

    useEffect(() => {
        inputChatElement.current.focus();
    });

    return (
        <div className="body-right__send">
            <button type="button" name="add-file">
                <i className="fa-solid fa-circle-plus"></i>
            </button>
            <input ref={inputChatElement} type="text" placeholder="Nhập tin nhắn..."
                value={currentContent}
                onChange={handleOnChange}
                onKeyDown={handleSendMessage}
            />
            <button type="button" name="icon">
                <i className="fa-solid fa-face-smile"></i>
            </button>
        </div>
    );
}

export default InputChatArea;