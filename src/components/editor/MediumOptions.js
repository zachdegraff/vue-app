import AnchorPreview from './extensions/anchor-preview'

const MediumOptions = {
    autoLink: true,
    toolbar: {
        buttons: ['bold', 'italic', 'anchor', 'quote']
    },
    placeholder: false,
    extensions: {
        'anchorPreview': new AnchorPreview()
    }
};

export default MediumOptions;