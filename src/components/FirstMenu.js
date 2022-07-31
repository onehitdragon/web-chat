import { memo} from "react";
import FirstMenuItemCheck from "./FirstMenuItemCheck";
import FirstMenuItemNormal from "./FirstMenuItemNormal";

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
                            <FirstMenuItemNormal key={index} row={row}/>
                        );
                    }
                })
            }
        </div>
    );
}

export default memo(FirstMenu);