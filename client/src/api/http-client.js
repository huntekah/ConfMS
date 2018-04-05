function parse(fetchPromise) {
    return fetchPromise
        .then((response) => {
            return response.ok
                ? response.json().then(
                    data => Promise.resolve(data),
                    err => Promise.resolve()
                )
                : response.json().then(
                    data => Promise.reject({status: response.status, data: data}),
                    err => Promise.reject({status: response.status})
                )
        });
}

export function get(url, headers = {}) {
    return parse(fetch(
        url,
        {
            method: 'get',
            headers: new Headers(headers)
        }
    ));
}

export function getOne(url, item, headers = {}) {
    return parse(fetch(
        url + "/" + String(item),
        {
            method: 'get',
            headers: new Headers(headers)
        }
    ));
}

const defaultHeaders = {
    "Content-Type": "application/json"
};

export function post(url, json, headers = {}) {
    return parse(fetch(
        url,
        {
            method: 'post',
            body: JSON.stringify(json),
            headers: new Headers(Object.assign(headers, defaultHeaders))
        }
    ));
}

export function put(url, json, headers = {}) {
    return parse(fetch(
        url,
        {
            method: 'put',
            body: JSON.stringify(json),
            headers: new Headers(Object.assign(headers, defaultHeaders))
        }
    ));
}

export function _delete(url, item, headers = {}) {
    return parse(fetch(
        url + "/" + String(item),
        {
            method: 'delete',
            headers: new Headers(Object.assign(headers, defaultHeaders))
        }
    ));
}

export function patch(url, item = undefined, json, headers = {}) {
    let path = "/"+String(item);
    if(item === undefined){ path = "";}
    return parse(fetch(
        url+path,
        {
            method: 'PATCH',
            body: JSON.stringify(json),
            headers: new Headers(Object.assign(headers, defaultHeaders))
        }
    ));
}
