import { memo } from "react";

function FirstMenuItemInput({row}){
    return (
        <input className="menu-1__item--input" placeholder={row.placeholder}
            value={row.value}
            onChange={(e) => row.handleOnInput(e.target.value)}/>
    );
}

export default memo(FirstMenuItemInput);