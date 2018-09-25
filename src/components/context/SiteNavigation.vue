<template>
    <div>
        <div class="q-caption uppercase text-weight-bold q-pl-xl">explore</div>
        <q-list link no-border class="site-navigation q-mt-sm">
            <q-item to="/" :class="{active:isActive('home')}">
                <q-icon name="home" size="1.4rem" class="q-mr-sm"/>
                Feed
            </q-item>
            <q-item to="/glossary" :class="{active:isActive('glossary')}">
                <q-icon name="library_books" size="1.4rem" class="q-mr-sm"/>
                Glossary
            </q-item>
            <q-item to="/questions" :class="{active:isActive('questions')}">
                <q-icon name="help" size="1.4rem" class="q-mr-sm"/>
                Questions
            </q-item>
            <q-item to="/glossary/tags" :class="{active:isActive('tags')}">
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
                    glossary: ['/glossary', '/glossary/table', '/glossary/saved'],
                    questions: ['/questions', '/questions/answered', '/questions/my'],
                    tags: ['/glossary/tags']
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