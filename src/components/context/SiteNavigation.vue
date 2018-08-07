<template>
    <div>
        <div class="q-caption uppercase text-weight-bold q-pl-xl">explore</div>
        <q-list link no-border class="site-navigation q-mt-sm">
            <q-item to="/" :class="{active:isActive('home')}">
                <q-icon name="home" size="1.4rem" class="q-mr-sm"/>
                Feed
            </q-item>
            <q-item to="/cards" :class="{active:isActive('cards')}">
                <q-icon name="note" size="1.4rem" class="q-mr-sm"/>
                Cards
            </q-item>
            <q-item to="/questions" :class="{active:isActive('questions')}">
                <q-icon name="help" size="1.4rem" class="q-mr-sm"/>
                Questions
            </q-item>
            <q-item to="/cards/tags" :class="{active:isActive('tags')}">
                <q-icon name="local_offer" size="1.4rem" class="q-mr-sm"/>
                Tags
            </q-item>
        </q-list>
    </div>
</template>
<script>
    export default {
        data: () => {
            return {
                links: {
                    home: ['/'],
                    cards: ['/cards', '/cards/table', '/cards/saved'],
                    questions: ['/questions', '/questions/answered', '/questions/my'],
                    tags: ['/cards/tags']
                }
            }
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
    }
</style>