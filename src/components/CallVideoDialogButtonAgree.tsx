import { memo } from "react";
import CallVideoDialogButton from "./CallVideoDialogButton";

function CallVideoDialogButtonAgree({onHandleClick = () => {}}){
    return (
        <CallVideoDialogButton color="green" handleOnClick={onHandleClick}/>
    );
}

export default memo(CallVideoDialogButtonAgree);