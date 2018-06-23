const ToolsMethods = {
    data: () => {
        return {
            keyEvent: null,
            mouseEvent: null,
            referenceToolsState: false
        }
    },
    methods: {
        isNavChars(e) {
            if (!(e instanceof KeyboardEvent)) {
                return false;
            }
            const chars = [13, 38, 40];
            for (let i in chars) {
                if (e.keyCode === chars[i]) {
                    return true;
                }
            }
            return false;
        },
        flushEvents() {
            this.keyEvent = null;
            //this.mouseEvent = null;
        },
        toggleEvent(name, e) {
            if (e !== null && this.referenceToolsState && this.isNavChars(e)) {
                e.preventDefault();
            }
            this[name] = e
        },
        changeFormatting(e) {
            this.form.description = e.content
        },
        toggleReferenceToolsState(e) {
            this.referenceToolsState = e.state
        }
    }
};

export default ToolsMethods;