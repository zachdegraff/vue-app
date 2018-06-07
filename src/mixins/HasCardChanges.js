const HasCardChanges = {
    methods: {
        confirm() {
            return this.$q.dialog({
                title: ' ',
                message: 'There are unsaved changes on this card. Do you want to navigate away from this card and lose these unsaved changes?',
                cancel: true,
                color: 'secondary'
            });
        },
        hasAnyChanges(state) {
            return this.__isCardChanged(state.form) ||
                this.__isLinksChanged(state.links) ||
                this.__isFileChanged(state.file) ||
                this.__isFlushImageChanged(state.flushImage) ||
                this.__isCollectionsChanged(state.form.collections)
        },
        __isCardChanged(form) {
            for (let i in this.form) {
                if (this.form[i] instanceof Object) {
                    continue;
                }
                if (this.form[i] instanceof Array) {
                    if (this.form[i].length !== form[i].length) {
                        return true
                    }
                    for (let j in this.form[i]) {
                        if (this.form[i][j] !== form[i][j]) {
                            return true
                        }
                    }
                }
                if (this.form[i] !== form[i]) {
                    return true
                }
            }

            return false
        },
        __isLinksChanged(links) {
            if (this.links.length !== links.length) {
                return true
            }
            for (let i in this.links) {
                for(let j in this.links[i]) {
                    if (links[i][j] === undefined) {
                        return true
                    }
                    if (this.links[i][j] !== links[i][j]) {
                        return true
                    }
                }
            }
            return false
        },
        __isFileChanged(file) {
            return file !== null
        },
        __isFlushImageChanged(state) {
            return state !== false
        },
        __isCollectionsChanged(collections) {
            if (this.form.collections.length !== collections.length) {
                return true;
            }
            for (let i in this.form.collections) {
                if (this.form.collections[i] !== collections[i]) {
                    return true;
                }
            }
            return false
        }
    }
};

export default HasCardChanges;