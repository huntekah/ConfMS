export function getHelloText() {
    return fetch(
        'http://localhost:8080/v1/hello',
        {method: 'get'}
    ).then((response) => {
        return response.ok
            ? response.json()
            : response.json()
                .then(
                    data => Promise.reject({status: response.status, data: data}),
                    err => Promise.reject({status: response.status})
                )
    });
}