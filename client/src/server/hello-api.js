import {get} from './http-client'

export function getHelloText() {
    return get('http://dev.confms.pl/api/v1/hello')
}
