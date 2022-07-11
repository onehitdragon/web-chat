import { useEffect, useRef, useState } from "react";
import IconChatArea from "./IconChatArea";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentConversaion } from "../app/features/chat/conversationsSlice";


function InputChatArea({sendTypingToServer}){
    const currentConversation = useSelector(selectCurrentConversaion);
    const [currentContent, setCurrentContent] = useState("");
    const [typing, setTyping] = useState(false);
    const dispatch = useDispatch();
    const textInputRef = useRef();
    const fileInputRef = useRef();

    useEffect(() => {
        if(currentConversation !== undefined){
            textInputRef.current.focus();
        }

        // eslint-disable-next-line
    }, [currentConversation]);

    const handleOnChange = (e) => {
        setCurrentContent(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key === 'Enter' && currentContent !== ''){
            setTyping(false);
            //sendTypingToServer(false);
            dispatch({
                type: "sendTextMessage",
                content: currentContent,
            });
            setCurrentContent('');
        }
    }

    const handleOnBlur = () => {
        if(typing){
            setTyping(false);
            //sendTypingToServer(false);
        }
    }

    useEffect(() => {
        if(currentContent !== "" && !typing){
            setTyping(true);
            //sendTypingToServer(true);
        }

        // eslint-disable-next-line
    }, [currentContent]);

    const handleOnChangeFile = () => {
        const inputElement = fileInputRef.current;
        const file = inputElement.files[0];
        inputElement.value = "";
        dispatch({
            type: "sendFileMessage",
            file: file
        });
    }

    return (
        <div className="body-right__send">
            <button type="button" name="add-file"
                onClick={() => { fileInputRef.current.click(); }}>
                <input ref={fileInputRef} style={{display: "none"}}
                    type="file"onChange={() => { handleOnChangeFile(); }}/>
                <i className="fa-solid fa-circle-plus"></i>
            </button>
            <input ref={ textInputRef } type="text" placeholder="Nhập tin nhắn..." 
                value={ currentContent }
                onChange={ handleOnChange }
                onKeyDown={ handleSendMessage }
                onBlur={ handleOnBlur }
            />
            <IconChatArea />
        </div>
    );
};

export default InputChatArea;