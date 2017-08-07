export const skelt = (obj, params = {}) => {
    if (obj === null) {
        return null;
    }

    if (typeof obj === 'function') {
        return skelt(obj(params), params);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => skelt(item, params));
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    return Object.keys(obj).reduce((updatedResult, key) => ({
        ...updatedResult,
        [key]: skelt(obj[key], params),
    }), obj);
};

export default skelt;
