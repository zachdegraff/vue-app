const DateFormatter = {
    methods: {
        toLocaleString(value) {
            const date = new Date(value),
                utc = new Date(Date.UTC(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ));

            return `${utc.getMonth() + 1}/${utc.getDate()}/${utc.getFullYear()} ${utc.getHours()}:${utc.getMinutes()}`
        },
        toUserFriendlyFormat(value) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            const date = new Date(value),
                utc = new Date(Date.UTC(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ));

            return `${utc.getHours()}:${utc.getMinutes()}, ${months[utc.getMonth()]} ${utc.getDate()} ${utc.getFullYear()} `
        }
    }
};

export default DateFormatter;