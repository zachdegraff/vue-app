const DateFormatter = {
    methods: {
        __time(date) {
            const meridiem = date.getHours() >= 12 ? 'pm' : 'am',
                hours = date.getHours() % 12 || 12,
                minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

            return `${hours}:${minutes} ${meridiem}`
        },

        __month(value) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

            return months[value]
        },

        toLocaleString(value) {
            const date = new Date(value.replace(/-/g, '/')),
                utc = new Date(Date.UTC(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ));
            return `${this.__time(utc)}, ${this.__month(utc.getMonth())} ${utc.getDate()} ${utc.getFullYear()}`
        },
        toLocaleDateString(value) {
            const date = new Date(value.replace(/-/g, '/')),
                utc = new Date(Date.UTC(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ));
            return `${this.__month(utc.getMonth())} ${utc.getDate()}, ${utc.getFullYear()}`
        }
    }
};

export default DateFormatter;