import { useEffect, useRef, useState } from "react";
import convertSecondMusic from "../tools/convertSecondMusic";

function VideoContent({src}){
    const [starting, setStarting] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [progess, setProgress] = useState(0);
    const audioElementRef = useRef();
    const [showingControl, setShowingControl] = useState(false);

    const handlePlayButtonClick = () => {
        setStarting(!starting);
    }

    useEffect(() => {
        if(starting){
            audioElementRef.current.play();
        }
        else{
            audioElementRef.current.pause();
        }
    }, [starting]);

    const handleOnAudioStart = (e) => {
        setDuration(e.target.duration);
        audioElementRef.current.loop = true;
    }

    const handleOnAudioTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
        setProgress((e.target.currentTime / duration) * 100);
    }

    const handleInputSeek = (value) => {
        audioElementRef.current.currentTime = (duration * (value / 100));
    }

    return (
        <div className="video-main">
            <video ref={audioElementRef} src={ src }
                onLoadedMetadata = { handleOnAudioStart }
                onTimeUpdate={ handleOnAudioTimeUpdate }/>
            <div className="control-main"
                style={{opacity: showingControl ? 1 : 0}}
                onMouseOver={ () => { setShowingControl(true) } } 
                onMouseLeave={ () => { setShowingControl(false) } }>
                <div className='control-main__play'>
                    <button onClick={() => handlePlayButtonClick() }>
                        <i className={starting ? "fa-solid fa-stop" : "fa-solid fa-play"}></i>
                    </button>
                </div>
                <input type='range' value={ progess } max='100' onInput={(e) => { handleInputSeek(e.target.value) }}/>
                <div className='control-main__controls'>
                    <div className='control-left'>
                        <button className='play' onClick={() => handlePlayButtonClick() }>
                            <i className={starting ? "fa-solid fa-stop" : "fa-solid fa-play"}></i>
                        </button>
                        <div className='time'>
                            <span className='progress-time'>{convertSecondMusic(currentTime)}</span>
                            <span> / </span>
                            <span className='total'>{convertSecondMusic(duration)}</span>
                        </div>
                        <button className='volume'>
                            
                        </button>
                    </div>
                    <div className='control-right'>
                        <button className='zoom'>
                            <i className="fa-solid fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoContent;