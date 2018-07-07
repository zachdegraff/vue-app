class StartTypeHelper {
    constructor(editor) {
        this.editor = editor;

        this.initialize()
    }

    initialize() {
        this.createElement();

        this.editor.el.parentNode.insertBefore(this.el, this.editor.el);
        this.editor.on('input', () => {

        })
    }

    createElement() {
        this.el = document.createElement('div');
        this.el.className = 'content-editor-content-helper';
        this.el.innerHTML = 'Type here card description. Type @ to link to cards or collections.';

        this.el.addEventListener('click', () => {
            this.editor.el.focus()
        });
    }
}

export default StartTypeHelper;