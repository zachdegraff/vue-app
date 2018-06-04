const APP_HOST = process.env.APP_HOST;

const Markdown = {
    methods: {
        markTags(content) {
            let result = content
                .replace(/\*([^*]*)\*/g, '<strong>$1</strong>')
                .replace(/_([^_]*)_/g, '<em>$1</em>');


            const matches = result.match(/<([^<]*)\|([^<]*)>/g);
            if (matches === null) {
                return result;
            }
            matches.forEach(i => {
                let tmpl = '<a href="$1" target="_blank">$2</a>';
                if (i.indexOf(APP_HOST) !== -1) {
                    //tmpl = '<router-link to="$1">$2</router-link>'
                    tmpl = '<a href="$1">$2</a>'
                }
                result = result.replace(i, i.replace(/<(.*)\|(.*)>/, tmpl))
            });
            return result.replace(APP_HOST, '');
        },
        clearMarks(content) {
            if (content === null) return '';
            return content
                .replace(/\*(.*)\*/g, '$1')
                .replace(/_(.*)_/g, '$1')
                .replace(/<([^<]*)\|([^<]*)>/g, '$2');
        }
    }
};

export default Markdown;