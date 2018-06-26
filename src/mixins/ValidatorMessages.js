const messages = {
    'required': 'Field is required',
    'minLength': 'Field must have at least :min letters',
    'email': 'Invalid email address',
    'exactPattern': 'Weak password'
};

function replace(str, params) {
    let result = str;
    for (let i in params) {
        result = result.replace(':' + i, params[i])
    }
    return result;
}

const ValidatorMessages = {
    methods: {
        firstErrorFor(obj) {
            for (let i in messages) {
                if (obj[i] !== undefined && !obj[i]) {
                    return replace(messages[i], obj.$params[i])
                }
            }
            return '';
        }
    }
};

export default ValidatorMessages;