import {securedGet, securedPatch} from './auth/http-client'
import config from '../config'

export function getParticipants() {
    return securedGet(config.basePath + '/api/v1/participants');
}

export function changeParticipantsState(id, newState) {
    return securedPatch(
        config.basePath + '/api/v1/participants',
        id,
        {state: newState}
    );
}
