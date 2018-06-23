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

            return `${utc.getMonth()}/${utc.getDate()}/${utc.getFullYear()} ${utc.getHours()}:${utc.getMinutes()}`
        }
    }
};

export default DateFormatter;