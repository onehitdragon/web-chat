const BASE_URL = "https://vijnh.online";

function doRequestApi(url, medthod, option = {}){
    if(medthod == null || medthod.toUpperCase() === 'GET'){
        return fetch(BASE_URL + url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        .then((res) => {
            if(!res.ok) throw new Error("error");
            return res.json();
        })
    }
    if(medthod.toUpperCase() === 'POST' || medthod.toUpperCase() === 'PUT'){
        return fetch(BASE_URL + url, {
            method: medthod.toUpperCase(),
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': option.contentType
            },
            body: option.body
        })
        .then((res) => {
            if(!res.ok) throw new Error("error");
            return res.json();
        })
    }
}

export default doRequestApi;