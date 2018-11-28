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
            this.setMetaData(val);
            this.setLinkColor();
        }
    },
    created() {
        if (this.site !== null) {
            this.setLinkColor();
            return this.setMetaData(this.site)
        }

        this.loadSite(this.link).catch(() => this.$router.push({name: 'not_found'}));
        this.loadCards(this.link);

    },
    methods: {
        ...mapActions({
            loadSite: 'publicSites/loadSite',
            loadCards: 'publicSites/loadCards'
        }),
        setLinkColor() {
            if (!this.site || !this.site.linkColor) return;
            if (document.getElementById('siteLinkColor') !== null) return;

            const style = document.createElement('style');
            style.setAttribute('id', 'siteLinkColor');
            document.head.appendChild(style);

            style.innerHTML = `a {color: ${this.site.linkColor} !important}; a:hover {color: ${this.site.linkColor} !important}`;
        }
    }
};

export default PublicSite;