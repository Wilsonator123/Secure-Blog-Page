

export const convertToString = (obj) => {
    if (obj === null || obj === undefined) {
        return '';
    }
    obj = obj.toString();
    return obj;
}