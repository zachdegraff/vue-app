import {mapGetters, mapActions} from 'vuex'

const PublicSite = {
    computed: {
        ...mapGetters({
            site: 'publicSites/getSite',
            cards: 'publicSites/getCards'
        }),
        link() {
            return this.$route.params.name
        }
    },
    watch: {
        site: function (val) {
            this.setMetaData(val)
        }
    },
    created() {
        if (this.site !== null) {
            return this.setMetaData(this.site)
        }

        this.loadSite(this.link).catch(() => this.$router.push({name: 'not_found'}));
        this.loadCards(this.link)
    },
    methods: {
        ...mapActions({
            loadSite: 'publicSites/loadSite',
            loadCards: 'publicSites/loadCards'
        })
    }
};

export default PublicSite;