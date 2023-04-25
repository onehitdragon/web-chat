const BASE_URL = "http://127.0.0.1:12345";

interface Option{
    contentType?: string,
    body?: string
}

type Medthod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function doRequestApi<T>(url: string, medthod: Medthod = 'GET', option: Option = {}){
    if(medthod.toUpperCase() === 'POST' || medthod.toUpperCase() === 'PUT'){
        return fetch(BASE_URL + url, {
            method: medthod.toUpperCase(),
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": option.contentType ? option.contentType : ""
            },
            body: option.body
        })
        .then((res) => {
            if(!res.ok) throw new Error("error");
            return res.json() as Promise<T>;
        })
    }

    return fetch(BASE_URL + url, {
        method: 'GET',
        mode: 'cors',
        credentials: "include"
    })
    .then((res) => {
        if(!res.ok) throw new Error("error");
        return res.json()  as Promise<T>;
    })
}

export default doRequestApi;
export { BASE_URL }