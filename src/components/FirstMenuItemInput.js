import { memo } from "react";

function FirstMenuItemInput({row}){
    return (
        <div className="menu-1__item--input">
            <input type={"text"} placeholder={row.placeholder}
                value={row.value}
                onChange={(e) => row.handleOnInput(e.target.value)}/>
            {
                row.value !== "" &&
                <button className="btn-close">
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
            }
        </div>
    );
}

export default memo(FirstMenuItemInput);