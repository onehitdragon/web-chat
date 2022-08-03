import { memo } from "react";

function FriendMenu({rows}){
    return (
        <div className="friends">
            {
                rows.map((row, index) => {
                    return (
                        <div key={index} className="friend" onClick={() => { row.handleOnClick(); }}>
                            <span>{row.title}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default memo(FriendMenu);