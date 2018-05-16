<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <search-form></search-form>
            <div class="cards-list row justify-center">
                <q-card class="col-sx-12 col-md-8 bg-white q-mb-md" v-for="(item, idx) in items" :key="idx">
                    <q-card-title>{{item.name}}</q-card-title>
                    <q-card-main>
                        <q-chip class="q-mr-sm" color="primary" v-for="(tag, index) in item.shorthand" :key="index">{{tag}}</q-chip>
                        <p class="text-faded q-mt-md" v-html="item.description"></p>
                    </q-card-main>
                    <q-card-separator/>
                    <q-card-actions align="end">
                        <q-btn flat color="primary" label="Show" class="float-right" @click="show(item.id)"/>
                    </q-card-actions>
                </q-card>
            </div>
            <router-view/>
        </q-page-container>
        <app-footer></app-footer>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import SearchForm from '../components/SearchForm.vue'
    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                'items': 'cards/items'
            })
        },
        components: {SearchForm, AppHeader, AppFooter},
        methods: {
            show(id) {
                this.$router.push({name: 'view_card', params: {id}})
            }
        }
    }
</script>
<style lang="scss">
    .cards-list {
        position: relative;
        margin-top: -50px;
    }
</style>