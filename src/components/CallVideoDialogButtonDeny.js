import { memo } from "react";
import CallVideoDialogButton from "./CallVideoDialogButton";

function CallVideoDialogButtonDeny({onHandleClick}){

    return (
        <CallVideoDialogButton color="red" rotate handleOnClick={onHandleClick}/>
    );
}

export default memo(CallVideoDialogButtonDeny);