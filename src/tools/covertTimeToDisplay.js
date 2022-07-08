function convertTimeToDisplay(timeNeedConvert){
    const time = new Date(timeNeedConvert);
    const tail = time.getHours() >= 12 ? 'PM' : 'AM';
    let minus = time.getMinutes();
    if(minus < 10){
        minus = "0" + minus;
    }

    return time.getHours() + ':' + minus + ' ' + tail;
}

export default convertTimeToDisplay;