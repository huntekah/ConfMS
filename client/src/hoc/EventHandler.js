import React from 'react';

let _isListening = false;
const _instancesToKeysToHandlers = new Map();
const _instances = [];

function _handleEvent(event) {
    let instance = _instances[_instances.length - 1];
    let handler = _instancesToKeysToHandlers[instance][event.code];
    if (handler) {
        handler()
    }
}


function addHandler(instance, key, handleFunction) {
    if (!_isListening) {
        document.addEventListener("keydown", _handleEvent, false);
        _isListening = true;
    }

    _instances.push(instance);

    if (!_instancesToKeysToHandlers[instance]) {
        _instancesToKeysToHandlers[instance] = new Map();
    }
    _instancesToKeysToHandlers[instance][key] = handleFunction;
}

function removeHandlers(instance) {
    let index = _instances.indexOf(instance);
    if (index !== -1) {
        _instances.splice(index, 1);
        delete _instancesToKeysToHandlers[instance];
        _instancesToKeysToHandlers.delete(instance);
        if (_instances.length === 0) {
            document.removeEventListener("keydown", _handleEvent, false);
            _isListening = false;
        }
    }
}


export function handleKey(key) {
    return function (target, name, descriptor) {
        const {componentDidMount, componentWillUnmount} = target;

        target.componentDidMount = function () {
            addHandler(this, key, descriptor.value.bind(this));
            if (componentDidMount) return componentDidMount.call(this);
        };

        target.componentWillUnmount = function () {
            removeHandlers(this);
            if (componentWillUnmount) return componentWillUnmount.call(this);
        };
    };
}

