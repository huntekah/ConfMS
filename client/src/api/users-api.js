import {post} from './http-client'
import config from '../config'

export function createUser(user) {
    return post(config.basePath + '/api/v1/users', user)
}

export function createParticipant(user) {
    return post(config.basePath + '/api/v1/participants', user)
}
