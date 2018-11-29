<template>
    <div class="public-site-header q-pt-xl" :style="overlay">
        <div class="row flex-center">
            <div class="col-xs-10 col-md-9 col-lg-5">
                <h1 class="text-center cursor-pointer" @click="toHome" :style="accentColor"><img class="public-site-logo gt-sm" :src="logo"/>{{site.name}}</h1>
                <q-search
                        no-icon
                        inverted
                        hide-underline
                        inverted-light
                        v-model="terms"
                        color="white"
                        :debounce="600"
                        :after="config"
                        @keyup.enter="submit"
                        placeholder="Search for acronyms or terms..."/>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            site: {
                type: Object,
                required: true
            }
        },
        data: () => {
            return {
                terms: '',
                config: [
                    {
                        icon: 'search',
                        handler() {

                        }
                    }
                ]
            }
        },
        created() {
            this.terms = this.$route.query.q || ''
        },
        watch: {
            terms: function () {
                this.submit()
            }
        },
        computed: {
            logo() {
                if (this.team && this.team.photo) {
                    return this.team.photo
                }
                return 'statics/team.png'
            },
            team() {
                if (!this.site) {
                    return null
                }
                return this.site.team
            },
            link() {
                return this.$route.params.name
            },
            overlay() {
                if (this.site.background) {
                    return {background: `url(${this.site.background})`}
                }
                return {}
            },
            accentColor() {
                if (!this.site) return {color: '#fff'};

                return {color: this.site.accentColor}
            }
        },
        methods: {
            submit() {
                if (this.terms === '') {
                    return this.$router.push({name: 'public_site', params: {name: this.link}})
                }

                if (this.terms.length < 2) return;

                this.$router.push({path: `/for/${this.site.slug}/search`, query: {q: this.terms}});
            },
            toHome() {
                this.$router.push({name: 'public_site', params: {name: this.link}})
            }
        }
    }
</script>
<style>
    .public-site-header {
        background-image: url('../../statics/public-site-bg.jpeg');
        background-size: cover;
        height: 300px;
    }

    .public-site-logo {
        border-radius: 30px;
        margin-right: 15px;
        vertical-align: middle;
        width: 60px;
    }
</style>