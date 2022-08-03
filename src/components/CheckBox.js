import { memo, useState } from "react";

function CheckBox({onChange}){
    const [checked, setChecked] = useState(false);

    return (
        <div className={`checkbox ${checked ? "checked" : ""}`} onClick={() => {
            onChange(!checked);
            setChecked(!checked);
        }}></div>
    );
}

export default memo(CheckBox);