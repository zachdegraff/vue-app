import {EventEmitter} from 'events'
import StartTypeHelper from './StartTypeHelper'

class ContentEditor extends EventEmitter {
    constructor(id, config = {}) {
        super();

        this.config = {

            ...config
        };

        this.el = document.getElementById(id);

        this.initialize()
    }

    initialize() {
        this.text = this.el.innerHTML;

        //document.addEventListener('selectionchange', this.handleSelection);
        //this.editor.addEventListener('keyup', this.handleKeyPress);


        this.startTypeHelper = new StartTypeHelper(this);

    }
}

export default ContentEditor;