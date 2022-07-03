function convertTimeToDisplay(timeNeedConvert){
    const time = new Date(timeNeedConvert);
    const tail = time.getHours() >= 12 ? 'PM' : 'AM';

    return time.getHours() + ':' + time.getMinutes() + ' ' + tail;
}

export default convertTimeToDisplay;