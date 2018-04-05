export class FormValidator {

    constructor(inputFields, globalValidationFunction = () => "") {
        this._fieldValidatorsMap = new Map(inputFields.map(fieldValidator => [fieldValidator.name, fieldValidator]));
        this._globalValidationFunction = globalValidationFunction;
        this._globalError = ""
    }

    runValidation(fieldName, value) {
        let fieldValidator = this._fieldValidatorsMap.get(fieldName);
        fieldValidator.runValidation(value)
    }

    runGlobalValidation(...args) {
        this._globalError = this._globalValidationFunction(...args);
    }

    resetField(fieldName) {
        let fieldValidator = this._fieldValidatorsMap.get(fieldName);
        fieldValidator.error = "";
        fieldValidator.touched = false;
    }

    getErrorMessage(fieldName) {
        let fieldValidator = this._fieldValidatorsMap.get(fieldName);
        return fieldValidator.error;
    }

    getGlobalErrorMessage() {
        return this._globalError;
    }

    isFormValid() {
        if (this._globalError !== "") {
            return false;
        }
        for (let fieldValidator of this._fieldValidatorsMap.values()) {
            if (fieldValidator.touched === false || fieldValidator.error !== "") {
                return false;
            }
        }
        return true;
    }
}







