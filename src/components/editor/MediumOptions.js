import AnchorPreview from './extensions/anchor-preview'

const MediumOptions = {
    autoLink: true,
    toolbar: {
        buttons: ['bold', 'italic', 'anchor', 'quote']
    },
    paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta', 'table', 'tbody', 'thead', 'tr', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        unwrapTags: []
    },
    placeholder: false,
    extensions: {
        'anchorPreview': new AnchorPreview()
    }
};

export default MediumOptions;