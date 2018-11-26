<template>
    <div class="public-site-header q-pt-xl" :style="overlay">
        <div class="row flex-center">
            <div class="col-xs-10 col-md-9 col-lg-5">
                <h1 class="text-white text-center"><img class="public-site-logo gt-sm" :src="logo"/>{{site.name}}</h1>
                <q-search placeholder="Search for acronyms or terms..." v-model="terms" @keyup.enter="submit" :debounce="600" inverted color="white" inverted-light hide-underline/>
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
                terms: ''
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
            overlay() {
                if (this.site.background) {
                    return {background: `url(${this.site.background})`}
                }
                return {}
            }
        },
        methods: {
            submit() {
                if (this.terms.length < 2) return;

                this.$router.push({path: `/for/${this.site.slug}/search`, query: {q: this.terms}});
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