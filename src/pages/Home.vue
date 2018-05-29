<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="q-mt-lg">
                <q-btn color="primary" @click="$router.push({name: 'cards_list'})">My Cards</q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
    import SearchForm from '../components/SearchForm.vue'
    import {mapActions} from 'vuex'

    export default {
        data: () => {
            return {
                opened: true
            }
        },
        created() {
            const hash = localStorage.getItem('join-token');
            if (hash !== null) {
                this.join(hash).then(data => {
                    this.$router.push({name: 'view_team', params: {id: data.member.teamId}})
                })
            }
        },
        components: {
            SearchForm
        },
        methods: {
            ...mapActions({
                join: 'teams/join'
            })
        }
    }
</script>