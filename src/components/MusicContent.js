import { useEffect, useRef, useState } from "react";
import convertSecondMusic from "../tools/convertSecondMusic";

function MusicContent({src}){
    const [starting, setStarting] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [progess, setProgress] = useState(0);
    const audioElementRef = useRef();

    const handlePlayButtonClick = () => {
        setStarting(!starting);
    }

    useEffect(() => {
        if(starting){
            //new Audio().loop
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
        <div className="audio-main">
            <audio ref={ audioElementRef } src={ src }
                onLoadedMetadata = { handleOnAudioStart } 
                onTimeUpdate = { handleOnAudioTimeUpdate }
                />
            <button className="audio-main__play" onClick={ () => { handlePlayButtonClick() } }>
                <i className={starting ? "fa-solid fa-stop" : "fa-solid fa-play"}></i>
            </button>
            <div className="audio-main__time">
                <span className='progress-time'>{convertSecondMusic(currentTime)}</span>
                <span> / </span>
                <span className='total'>{convertSecondMusic(duration)}</span>
            </div>
            <input type="range" max={100} value={ progess } onInput={(e) => { handleInputSeek(e.target.value) }}/>
            <button className="audio-main__volume" />
        </div>
    );
}

export default MusicContent;