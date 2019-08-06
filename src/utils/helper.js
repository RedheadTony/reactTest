export const getChangeableValue = (obj, pathForForm) => {
    let changeableValue = obj;
    if (pathForForm) {
        const keysArray = pathForForm.split('.');
        keysArray.forEach(key => {
            changeableValue = changeableValue[key];
        })
    }
    return changeableValue;
};

export const valueIsChanged = (prev, next) => {
    if (typeof prev === 'object' && typeof next === 'undefined') return false;
    if (typeof prev === 'undefined' && typeof next === 'string') return true;
    if (typeof prev === 'string') {
        if (prev !== next) return true;
        return false;
    }
    return false;
};

export const isValidValue = value => value.match(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);