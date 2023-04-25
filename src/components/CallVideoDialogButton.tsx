import { memo } from "react";

function CallVideoDialogButton({color = "green", rotate = false, handleOnClick = () => {}}){

    return (
        <button className={`button--${color} ` + (rotate ? "button--rotate-133" : "")}
            onClick={() => { handleOnClick(); }}>
            <i className="fa-solid fa-phone"></i>
        </button>
    );
}

export default memo(CallVideoDialogButton);