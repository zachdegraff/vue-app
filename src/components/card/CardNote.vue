<template>
    <div class="card-item-note">
        <div class="card-item-note-title">private note</div>
        <q-input v-model="note" type="textarea" placeholder="Click to add a private note" @blur="save"/>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => {
            return {
                note: ''
            }
        },
        created() {
            this.get(this.id).then(data => this.note = data.note)
        },
        methods: {
            ...mapActions({
                get: 'note/get',
                store: 'note/store',
            }),
            save() {
                this.store({id: this.id, note: this.note})
            },
        }
    }
</script>