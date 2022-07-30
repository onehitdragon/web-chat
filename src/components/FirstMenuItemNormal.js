import { memo } from "react";

function FirstMenuItemNormal({row}){
    return (
        <div className="menu-1__item"
            onClick={() => { row.handleOnClick() }}>
            {row.title}
        </div>
    );
}

export default memo(FirstMenuItemNormal);