import { memo } from "react"

function SeconnMenu({whenInput}){
    return (
        <div className="menu menu-2">
            <input className="menu-2__item--input" placeholder="Nhập nội dung..."
                onChange={(e) => whenInput(e.target.value)}/>
        </div>
    );
}

export default memo(SeconnMenu);