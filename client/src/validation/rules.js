import validator from 'validator'

export function createRule(checkFunction, errorMessage) {
    return {
        checkFunction: checkFunction,
        errorMessage: errorMessage
    }
}

export function minLength(min = 0) {
    return createRule(
        (value) => {
            return validator.isLength(value, {min: min})
        },
        'Should be a least ' + min + ' long'
    )
}

export function maxLength(max) {
    return createRule(
        (value) => {
            return validator.isLength(value, {max: max})
        },
        'Should be at most ' + max + ' long'
    )
}

export function dateInFuture() {
    return createRule(
        (value) => {
            return value.getDate() >= new Date().getDate()
        },
        'Should be in future')
}

export function dateInPast() {
    return createRule(
        (value) => {
            return value.getDate() <= new Date().getDate()
        },
        'Should be in past')
}

export function eachValueInSeparateLine() {
    return createRule(
        (value) => {
            return !/[ \t\f]/.test(value)
        },
        'Each value has to be in separate line'
    )
}

export function isEmail() {
    return createRule(
        (value) => {
            return validator.isEmail(value)
        },
        'Should be an email')
}

export function isPhoneNumber() {
    return createRule(
        (value) => {
            return validator.isMobilePhone(value, 'any')
        },
        'Should be phone number')
}

export function isPrice() {
    return createRule(
        (value) => {
            debugger
            if (!isNaN(value) && parseFloat(value)) {
                if (value.indexOf('.') !== -1) {
                    return value.split('.')[1].length <= 2
                }
                else {
                    return true
                }
            } else {
                return false
            }
        },
        'Should be a valid price'
    )
}
