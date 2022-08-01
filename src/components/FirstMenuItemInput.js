import { memo, useEffect, useRef } from "react";

function FirstMenuItemInput({row}){
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="menu-1__item--input">
            <input type={"text"} placeholder={row.placeholder}
                ref={inputRef}
                value={row.value}
                onChange={(e) => row.handleOnInput(e.target.value)}/>
            {
                row.value !== "" &&
                <button className="btn-close" onClick={() => { row.handleOnInput("")}}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
            }
        </div>
    );
}

export default memo(FirstMenuItemInput);