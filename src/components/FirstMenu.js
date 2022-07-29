import { memo, useEffect, useState } from "react";

function FirstMenu({rows = []}){
    const [checkeds, setCheckeds] = useState(null);
    const handleCheckBoxClick = (row, index) => {
        const value = checkeds.get(index);
        const checkedsClone = new Map(checkeds);
        checkedsClone.set(index, !value);
        setCheckeds(checkedsClone);
        row.handleOnClick(!value);
    }
    useEffect(() => {
        const checkedsValue = new Map();
        rows.forEach((row, index) => {
            if(row.type === "checkbox"){
                checkedsValue.set(index, false);
            }
        });
        setCheckeds(checkedsValue);

        // eslint-disable-next-line
    }, []);

    return (
        checkeds !== null &&
        <div className="menu-1">
            {
                rows.map((row, index) => {
                    if(row.type === "checkbox"){
                        return (
                            <div key={index}
                                className="menu-1__item menu-1__item--checkbox"
                                onClick={() => { handleCheckBoxClick(row, index) }}>
                                <span>{row.title}</span>
                                {checkeds.get(index) ? <i className="fa-solid fa-square-check"></i> : <i className="fa-regular fa-square-check"></i>}
                            </div>
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