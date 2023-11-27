
export function compareOne(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}

export function compareTwo(value1, value2) {
    if (value1 < value2) {
        return 1;
    } else if (value1 > value2) {
        return -1;
    } else {
        return 0;
    }
}

export function compare(key, desc) {
    return function (a, b) {
        let value1 = a[key];
        let value2 = b[key];
        if (desc === true) {
            return value1 - value2;
        } else {
            return value2 - value1;
        }
    };
}