export class FieldValidator {
    constructor(name, rules = [], required = true) {
        if (rules === null) {
            rules = []
        }
        this._name = name;
        this._rules = rules;
        this._error = "";
        this._required = required;
        this._touched = !required;
    }

    get name() {
        return this._name;
    }


    get error() {
        return this._error;
    }

    set error(value) {
        this._error = value;
    }

    get touched() {
        return this._touched;
    }

    set touched(value) {
        this._touched = value;
    }

    runValidation(value) {
        this.touched = true;
        if (value === undefined || value === "") {
            this.error = this._required ? "Field is required" : "";
            return
        }

        for (let rule of this._rules) {
            if (!rule.checkFunction(value)) {
                this.error = rule.errorMessage;
                return
            }
        }
        this.error = ""
    }

}

