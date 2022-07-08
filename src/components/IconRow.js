import { memo, useState } from "react";
import { useDispatch } from "react-redux";

function IconRow({title, listIcon}){
    const [showing, setShowing] = useState(false);
    const dispatch = useDispatch();

    const handleIconClick = (icon) => {
        dispatch({
            type: "sendIconMessage",
            icon: icon
        });
    }

    return (
        <div className="menu-row">
            <div className="menu-row__title" onClick={ () => { setShowing(!showing) } }>
                <p>{ title }</p>
                <i className={"fa-solid fa-angle-right " + (showing && "rotate90")}></i>
            </div>
            <div className="menu-row__icons" style={{ display: showing ? "flex" : "none" }}>
                {
                    listIcon.map((icon, index) => {
                        return (
                            <div key={ icon }
                                className={"icon " + (index % 2 === 0 ? "icon--red" : "icon--blue")}
                                onClick = { () => { handleIconClick(icon); } }>
                                <img src={ "/img/icons/" + icon } alt="error"/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default memo(IconRow);