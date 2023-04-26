import { memo, useEffect, useRef, useState } from "react";
import IconChatArea from "./IconChatArea";
import { useDispatch, useSelector } from "react-redux";
import { sendTextMessage, sendFileMessage } from "../features/chat/conversationsSlice";
import styles from "./Home.module.css";

function InputChatArea(){
    const currentConversationId = useSelector(state => state.conversations.currentConversationId);
    const socket = useSelector(state => state.socket);
    const [currentContent, setCurrentContent] = useState("");
    const [typing, setTyping] = useState(false);
    const dispatch = useDispatch();
    const textInputRef = useRef();
    const fileInputRef = useRef();

    useEffect(() => {
        textInputRef.current.focus();
    }, [currentConversationId]);

    const handleOnChange = (e) => {
        setCurrentContent(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key === 'Enter' && currentContent !== ''){
            setTyping(false);
            socket.invoke("Typing", currentConversationId, false);
            dispatch(sendTextMessage(currentContent));
            setCurrentContent('');
        }
    }

    const handleOnBlur = () => {
        if(typing){
            setTyping(false);
            socket.invoke("Typing", currentConversationId, false);
        }
    }

    useEffect(() => {
        if(currentContent !== "" && !typing){
            setTyping(true);
            socket.invoke("Typing", currentConversationId, true);
        }
        dispatch({
            type: "removeAmountMessageNotRead"
        });

        // eslint-disable-next-line
    }, [currentContent]);

    const handleOnChangeFile = () => {
        const inputElement = fileInputRef.current;
        const file = inputElement.files[0];
        inputElement.value = "";
        dispatch(sendFileMessage(file));
    }

    return (
        <div className={styles["body-right__send"]}>
            <button type="button" name="add-file"
                onClick={() => { fileInputRef.current.click(); }}>
                <input ref={fileInputRef} style={{display: "none"}}
                    type="file"onChange={() => { handleOnChangeFile(); }}/>
                <i className={"fa-solid fa-circle-plus"}></i>
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

export default memo(InputChatArea);