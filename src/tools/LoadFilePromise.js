import { getDownloadURL, ref } from "firebase/storage";

const loadIconPromise = (message) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = message.fileAttachUrl;
        img.onload = () => {
            setTimeout(() => {
                resolve({
                    message: message,
                    type: "icon",
                    src: img.src
                });
            }, 500);
        }
    });
}

const loadImagePromise = (message, storageFireBase) => {
    return new Promise((resolve, reject) => {
        getDownloadURL(ref(storageFireBase, message.fileAttachUrl))
        .then((url) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                setTimeout(() => {
                    resolve({
                        message: message,
                        type: "image",
                        src: img.src
                    });
                }, 500);
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

const loadMusicPromise = (message, storageFireBase) => {
    return new Promise((resolve, reject) => {
        getDownloadURL(ref(storageFireBase, message.fileAttachUrl))
        .then((url) => {
            const audio = new Audio();
            audio.src = url;
            audio.onloadstart = () => {
                setTimeout(() => {
                    resolve({
                        message: message,
                        type: "music",
                        src: audio.src
                    });
                }, 500);
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

const loadVideoPromise = (message, storageFireBase) => {
    return new Promise((resolve, reject) => {
        getDownloadURL(ref(storageFireBase, message.fileAttachUrl))
        .then((url) => {
            const video = document.createElement("video");
            video.src = url;
            video.onloadstart = () => {
                setTimeout(() => {
                    resolve({
                        message: message,
                        type: "video",
                        src: video.src
                    });
                }, 500);
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export { loadIconPromise, loadImagePromise, loadMusicPromise, loadVideoPromise }

