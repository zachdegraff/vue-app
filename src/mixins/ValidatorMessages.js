const messages = {
    'required': 'Field is required',
    'minLength': 'Field must have at least :min letters',
    'maxLength': 'URL must be less than :max characters and only contain letters and numbers',
    'email': 'Invalid email address',
    'slug': 'URL must only contain letters and numbers',
    'exactPattern': 'Password must contain letters, numbers, and special characters.'
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