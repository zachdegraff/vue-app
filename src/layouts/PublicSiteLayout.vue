<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <router-view></router-view>
            </q-page>
        </q-page-container>
        <div class="public-site-footer">
            <span v-if="site">{{site.name}}</span> is powered by
            <a href="https://wonderus.app/" target="_blank">Wonderus</a>
        </div>
        <p class="back-to-top" v-if="scrolled" v-scroll-to="{el: '#q-app'}" :style="linkColor">&uarr;</p>
    </q-layout>
</template>
<script>
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

    .public-site-footer {
        border-top: solid 1px #ddd;
        color: rgba(0, 0, 0, 0.4);
        height: 100px;
        margin-top: 50px;
        text-align: center;
        padding: 15px;
    }
</style>