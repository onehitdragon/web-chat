import { memo} from "react";
import FirstMenuItemCheck from "./FirstMenuItemCheck";
import FirstMenuItemInput from "./FirstMenuItemInput";
import FirstMenuItemNormal from "./FirstMenuItemNormal";

function FirstMenu({rows = []}){
    return (
        <div className="menu menu-1">
            {
                rows.map((row, index) => {
                    if(row.type === "checkbox"){
                        return (
                            <FirstMenuItemCheck key={index} row={row}/>
                        );
                    }
                    if(row.type === "input"){
                        return (
                            <FirstMenuItemInput key={index} row={row}/>
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