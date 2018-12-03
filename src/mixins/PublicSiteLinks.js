const PublicSiteLinks = {
    methods: {
        handleClicks($event) {
            const {target} = $event;
            if (target.href && target.href.match(`/for/${this.link}`)) {
                const {altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented} = $event;
                if (metaKey || altKey || ctrlKey || shiftKey) return;
                if (defaultPrevented) return;
                if (button !== undefined && button !== 0) return;
                if (target && target.getAttribute) {
                    const linkTarget = target.getAttribute('target');
                    if (/\b_blank\b/i.test(linkTarget)) return
                }
                const url = new URL(target.href);
                const to = url.pathname;
                if (window.location.pathname !== to && $event.preventDefault) {
                    $event.preventDefault();
                    this.$router.push(to)
                }
            }
        },
        convertLinks(card) {
            let content = card.description.replace(/\/(cards|glossary)\/([0-9]+)/g, `/for/${this.link}/$2`);
            return content.replace(/\/(cards|glossary)\/tag\/(.+?)/g, `/for/${this.link}/tag/$2`)
        }
    }
};

export default PublicSiteLinks;