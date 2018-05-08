import {Notify} from 'quasar'

export const notify = (message) => {
    Notify.create({
        message,
        timeout: 1000,
        type: 'positive',
        color: 'positive',
        position: 'top-left'
    })
}