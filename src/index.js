export const skelt = (obj, params = {}) => {
    if (typeof obj === 'function') {
        return skelt(obj(params), params);
    } else if (Array.isArray(obj)) {
        return obj.map(item => skelt(item, params));
    } else if (typeof obj !== 'object') {
        return obj;
    }

    return Object.keys(obj).reduce((agg, key) => ({
        ...agg,
        [key]: skelt(obj[key], params),
    }), obj);
};

export default skelt;
