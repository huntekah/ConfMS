import {
    _delete as notSecuredDelete,
    get as notSecuredGet,
    getOne as notSecuredGetOne,
    post as notSecuredPost,
    put as notSecuredPut,
    patch as notSecuredPatch,
} from "./../http-client"
import {authStore} from "../../stores";

function getAuthorizationHeaders() {
    return {
        "Authorization": authStore.authorizationToken
    };
}

export function securedGet(url, headers = {}) {
    return notSecuredGet(url, Object.assign(headers, getAuthorizationHeaders()))
}

export function securedGetOne(url, item, headers = {}) {
    return notSecuredGetOne(url, item, Object.assign(headers, getAuthorizationHeaders()))
}

export function securedPost(url, json, headers = {}) {
    return notSecuredPost(url, json, Object.assign(headers, getAuthorizationHeaders()))
}

export function securedPut(url, json, headers = {}) {
    return notSecuredPut(url, json, Object.assign(headers, getAuthorizationHeaders()))
}

export function securedDelete(url, item, headers = {}) {
    return notSecuredDelete(url, item, Object.assign(headers, getAuthorizationHeaders()))
}

export function securedPatch(url, item = undefined, json, headers = {}) {
    return notSecuredPatch(url, item, json, Object.assign(headers, getAuthorizationHeaders()))
}
