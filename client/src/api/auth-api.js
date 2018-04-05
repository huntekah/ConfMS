import {post} from './http-client'
import {securedGet} from './auth/http-client'
import config from '../config'

export function authenticate(email, password) {
    return post(config.basePath + '/api/v1/auth', {
        email: email,
        password: password
    })
}

export function refresh() {
    return securedGet(config.basePath + '/api/v1/auth')
}
