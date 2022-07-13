function convertSecondMusic(secondTime){
    // 00:00
    let minus = parseInt(secondTime / 60);
    let second = parseInt(secondTime - (60 * minus));
    if(minus < 10){
        minus = "0" + minus;
    }
    if(second < 10){
        second = "0" + second;
    }

    return minus + ":" + second;
}

export default convertSecondMusic;