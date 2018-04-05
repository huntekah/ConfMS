import { action, autorun, computed, observable } from 'mobx'
import jwtDecode from 'jwt-decode'
import { authenticate as apiAuthenticate, refresh as apiRefresh } from '../api/auth-api'

class AuthStore {
    @observable token = undefined

    constructor() {
        let parsedLocalStorage = {
            token: localStorage.getItem('token')
        }

        this.setToken(parsedLocalStorage.token ? parsedLocalStorage.token : undefined)

        autorun(() => {
            if (this.token) {
                localStorage.setItem('token', this.token)
                clearInterval(this.refreshTask)
                if (!this.isTokenExpired()) {
                    let millisecondsToRefresh = this.millisecondsToExpire * 2.0 / 3.0
                    this.refreshTask = setTimeout(this.refreshToken.bind(this), millisecondsToRefresh)
                }
            }
            else {
                localStorage.removeItem('token')
                clearTimeout(this.refreshTask)
            }
        })
    }

    @action
    setToken(token) {
        try {
            this.decodedToken = token ? jwtDecode(token) : undefined
            this.token = token
        }
        catch (error) {
            this.token = undefined
            this.decodedToken = undefined
        }
    }

    @computed
    get authorizationToken() {
        return `Bearer ${this.token ? this.token : ''}`
    }

    @computed
    get expiration() {
        return this.decodedToken ? this.decodedToken['exp'] : undefined
    }

    @computed
    get millisecondsToExpire() {
        return this.expiration * 1000 - Date.now()
    }

    @computed
    get user() {
        return this.decodedToken ? {
            email: this.decodedToken['email']
        } : undefined
    }

    isTokenExpired() {
        return this.expiration ? this.millisecondsToExpire <= 0 : true
    }

    isAuthenticated() {
        return this.token && !this.isTokenExpired()
    }

    authenticate(email, password) {
        return apiAuthenticate(email, password)
            .then((response) => {
                this.setToken(response.token)
            })
    }

    invalidate() {
        this.setToken(undefined)
    }

    refreshToken() {
        clearTimeout(this.refreshTask)
        apiRefresh()
            .then((response) => {
                this.setToken(response.token)
            })
            .catch((error) => {
                console.log(error)
                this.invalidate()
            })
    }
}

export default AuthStore