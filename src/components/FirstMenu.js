import { memo} from "react";
import FirstMenuItemCheck from "./FirstMenuItemCheck";

function FirstMenu({rows = []}){
    return (
        <div className="menu-1">
            {
                rows.map((row, index) => {
                    if(row.type === "checkbox"){
                        return (
                            <FirstMenuItemCheck key={index} row={row}/>
                        );
                    }
                    else {
                        return (
                            <div key={index} className="menu-1__item"
                                onClick={() => { row.handleOnClick() }}>
                                {row.title}
                            </div>
                        );
                    }
                })
            }
        </div>
    );
}

export default memo(FirstMenu);