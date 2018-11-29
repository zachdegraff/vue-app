<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <router-view></router-view>
            </q-page>
        </q-page-container>
        <dialogs-store></dialogs-store>
        <p class="back-to-top" v-if="scrolled" v-scroll-to="{el: '#q-app'}" :style="linkColor">&uarr;</p>
    </q-layout>
</template>
<script>
    import DialogsStore from '../components/DialogsStore.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                scrolled: false
            };
        },
        beforeMount() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        computed: {
            ...mapGetters({
                site: 'publicSites/getSite'
            }),
            linkColor() {
                if (!this.site) return {};
                return {background: this.site.linkColor}
            }
        },
        components: {DialogsStore},
        methods: {
            handleScroll() {
                this.scrolled = window.scrollY > 200;
            }
        },
    }
</script>
<style>
    .back-to-top {
        background: #2fab65;
        color: #fff;
        position: fixed;
        right: 15px;
        bottom: 50px;
        width: 45px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        padding-top: 6px;
        cursor: pointer;
    }
</style>