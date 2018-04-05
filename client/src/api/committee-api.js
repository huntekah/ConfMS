import {securedDelete, securedGet, securedPost, securedPut} from './auth/http-client'
import config from '../config'

export function sendOrganizersInvitations(emails) {
    return securedPost(config.basePath + '/api/v1/conference/organizers/invitations', {
        emails: emails
    })
}

export function acceptInvitation(email, invitationToken) {
    return securedPost(config.basePath + '/api/v1/conference/organizers', {
        email: email,
        invitationToken: invitationToken
    })
}

export function getOrganizers() {
    return securedGet(config.basePath + '/api/v1/conference/organizers');
}

export function deleteOrganizer(userId) {
    return securedDelete(config.basePath + '/api/v1/conference/organizers', userId)
}
