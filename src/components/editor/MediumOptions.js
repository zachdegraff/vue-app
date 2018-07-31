import AnchorPreview from './extensions/anchor-preview'

const MediumOptions = {
    autoLink: true,
    toolbar: {
        buttons: ['bold', 'italic', 'anchor', 'quote']
    },
    paste: {
        forcePlainText: false,
        cleanPastedHTML: false,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta'],
        unwrapTags: []
    },
    placeholder: false,
    extensions: {
        'anchorPreview': new AnchorPreview()
    }
};

export default MediumOptions;