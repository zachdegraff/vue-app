const APP_HOST = process.env.APP_HOST;

const Markdown = {
    methods: {
        markTags(content) {
            if (!content) return '';
            let result = content
                .replace(/([\s\.,\'\"]+)\*([^*]*)\*([\s\.,\'\"]+)/g, '$1<strong>$2</strong>$3')
                .replace(/([\s\.,\'\"]+)_([^_]*)_([\s\.,\'\"]+)/g, '$1<em>$2</em>$3');


            const matches = result.match(/<([^<]*)\|([^<]*)>/g);
            if (matches === null) {
                return result
            }
            matches.forEach(i => {
                let tmpl = '<a href="$1" target="_blank">$2</a>';
                if (i.indexOf(APP_HOST) !== -1) {
                    tmpl = '<a href="$1" @click.prevent="open(\'$1\')">$2</a>';
                }
                result = result.replace(i, i.replace(APP_HOST, '').replace(/<(.*)\|(.*)>/, tmpl))
            });
            return result
        },
        clearMarks(content) {
            if (!content) return '';
            return content
                .replace(/([\s\.,\'\"]+)\*([^*]*)\*([\s\.,\'\"]+)/g, '$1$2$3')
                .replace(/([\s\.,\'\"]+)_([^_]*)_([\s\.,\'\"]+)/g, '$1$2$3')
                .replace(/<([^<]*)\|([^<]*)>/g, '$2');
        }
    }
};

export default Markdown;