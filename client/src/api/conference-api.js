import {securedPost, securedPut, securedPatch} from './auth/http-client'
import {get} from './http-client'
import config from '../config'

export function getConference() {
    return get(config.basePath + '/api/v1/conference')
}

export function createConference(conference) {
    return securedPost(config.basePath + '/api/v1/conference', conference)
}

export function editConference(conference) {
    return securedPut(config.basePath + '/api/v1/conference', conference)
}

export function emailAutoComplete(text) {
    return securedPost(config.basePath + '/api/v1/list/mail', {input: text})
}

export function sendEmail(email) {
    return securedPost(config.basePath + '/api/v1/mail', {
        title: email.emailTitle,
        msgBody: email.emailMsgBody,
        to: email.Recipients,
    })
}

export function setConferenceStatus(status) {
  return securedPatch(config.basePath + '/api/v1/conference',"status",{
    registrationOpen: status.registration,
    submissionOpen: status.submission,
  })
}
