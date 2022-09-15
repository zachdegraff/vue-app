<template>
    <div>
        <div class="q-caption uppercase text-weight-bold q-pl-xl">knowledge</div>
        <q-list link no-border class="site-navigation q-mt-sm">
            <q-item to="/" :class="{active:isActive('home')}">
                <q-icon name="home" size="1.4rem" class="q-mr-sm"/>
                Feed
            </q-item>
            <q-item to="/glossary" :class="{active:isActive('glossary')}">
                <q-icon name="library_books" size="1.4rem" class="q-mr-sm"/>
                Glossary
            </q-item>
            <q-item to="/content-packs" :class="{active:isActive('content-packs')}">
                <q-icon name="library_books" size="1.4rem" class="q-mr-sm"/>
                Content Packs
            </q-item>
            <q-item to="/requests" :class="{active:isActive('requests')}">
                <q-icon name="help" size="1.4rem" class="q-mr-sm"/>
                Requests
            </q-item>
            <q-item to="/contentpacks" :class="{active:isActive('contentpacks'), cps: true}">
                <q-icon name="folder" size="1.4rem" class="q-mr-sm"/>
                Content Packs
            </q-item>
        </q-list>
        <div v-if="team && team.isOwner">
            <div class="q-caption uppercase text-weight-bold q-pl-xl q-my-md">share</div>
            <q-list link no-border class="site-navigation q-mt-sm">
                <q-item to="/integrations" :class="{active:isActive('integrations')}">
                    <q-icon name="swap_vert" size="1.4rem" class="q-mr-sm"/>
                    Integrations
                </q-item>
                <q-item to="/public-sites" :class="{active:isActive('publicSites')}" v-if="team && team.isSiteAllowed == 1">
                    <q-icon name="launch" size="1.4rem" class="q-mr-sm"/>
                    Public Site
                </q-item>
            </q-list>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                links: {
                    home: ['/'],
                    glossary: ['/glossary', '/glossary/table', '/glossary/favorites', '/glossary/tags'],
                    requests: ['/requests', '/requests/answered', '/requests/my'],
                    integrations: ['/integrations'],
                    publicSites: ['/public-sites'],
                    contentPacks: ['/contentpacks']
                }
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current'
            })
        },
        methods: {
            isActive(name) {
                const links = this.links[name] || [];
                for (let i in links) {
                    if (this.$route.fullPath === links[i]) {
                        return true
                    }
                }
                return false
            }
        }
    }
</script>
<style lang="scss">
    .site-navigation {
        .q-item {
            border-left: solid 10px transparent;
            padding: 8px 25px;
            &.router-link-active, &.router-link-exact-active {
                background: none;
            }
            &.active, &:hover {
                background: none;
                border-left-color: #2fab65;
                color: #2fab65
            }
        }
        .cps {
          display: none;
        }
    }
</style>
