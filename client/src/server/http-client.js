function parse(fetchPromise) {
    return fetchPromise
        .then((response) => {
            return response.ok
                ? response.json()
                : response.json().then(
                    data => Promise.reject({status: response.status, data: data}),
                    err => Promise.reject({status: response.status})
                )
        });
}

export function get (url) {
    return parse(fetch(
        url,
        {method: 'get'}
    ));
}

