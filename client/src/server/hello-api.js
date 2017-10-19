import {get} from './http-client'

export function getHelloText() {
    return get('http://localhost:8080/v1/hello')
}