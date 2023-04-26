import { Fragment, memo, useEffect, useRef, useState } from "react";
import IconRow from "./IconRow";
import styles from "./Home.module.css";

function IconChatArea(){
    const [dinoIcons] = useState(['ankylosaurus.png','apatosaurus.png','archaeopteryx.png','dilophosaurus.png',
    'dinosaur-egg.png','dried-insect-in-amber.png','elasmosaurus.png','fossil.png','pteranodon.png',
    'spinosaurus.png','stegosaurus.png','triceratops.png','velociraptor.png']);
    const [emojiIcons] = useState(['confused.png','cool.png','in-love.png','in-love-1.png',
    'sad.png','sad-1.png','sad-2.png','smile.png','smile-1.png','surprised.png']);
    const [nowarIcons] = useState(['no-tanks.png','no-violence.png','no-war.png','no-war-1.png','no-war-3.png',
    'no-war-4.png','no-war-5.png','no-war-6.png','no-war-8.png','no-war-10.png','no-war-11.png',
    'no-war-20.png','no-war-7.png']);
    const [showing, setShowing] = useState(false);
    const iconAreaElementRef = useRef(null);

    useEffect(() => {
        const hide = (e) => {
            if(!iconAreaElementRef.current.contains(e.target)){
                setShowing(false);
            }
        }
        document.addEventListener("click", hide)
        return () => {
            document.removeEventListener("click", hide);
        }
    }, []);

    return (
        <Fragment>
            <button type="button" name="icon" onClick={ (e) => { setShowing(!showing); e.stopPropagation(); } }>
                <i className={"fa-solid fa-face-smile"}></i>
            </button>
            <div ref={ iconAreaElementRef } className={styles["icon-area"]} style={{ display: showing ? "flex" : "none" }}>
                <div className={styles.main}>
                    <IconRow title="Dinos" listIcon={ dinoIcons } />
                    <IconRow title="Mọi người" listIcon={ emojiIcons } />
                    <IconRow title="No war" listIcon={ nowarIcons } />
                </div>
            </div>
        </Fragment>
    );
}

export default memo(IconChatArea);