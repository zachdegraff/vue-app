<template>
    <div class="content-editor-panel">
        <div class="content-editor-content-helper" @click="editor.focus()" v-show="isHelperVisible">Type here card description. Type @ to link to cards or collections.</div>
        <div id="contentEditor" class="content-editor-content" contenteditable="true">
            <p><br/></p>
        </div>
        <editor-tags :position="caretPosition" :is-visible="isTagsVisible" @choose="handleTagChoosing"></editor-tags>
        <input type="file" class="content-editor-uploader" ref="file"/>
    </div>
</template>
<script>
    import EditorTags from '../editor/EditorTags.vue'

    import {setCaretAtEnd} from '../../helpers'
    import api from '../../api'

    export default {
        data: () => {
            return {
                editor: null,
                selection: null,
                childNodesLength: 0,
                activeElement: null,
                caretPosition: null,
                isTagsVisible: false,
                isHelperVisible: false
            }
        },
        components: {EditorTags},
        mounted() {
            this.editor = document.getElementById('contentEditor');

            this.childNodesLength = this.editor.childNodes.length;
            if (this.childNodesLength !== 0) {
                this.activeElement = this.editor.childNodes[this.editor.childNodes.length - 1]
            }

            this.checkTagsVisibility();
            this.checkHelperVisibility();

            document.addEventListener('selectionchange', this.handleSelection);
            this.editor.addEventListener('keyup', this.handleKeyPress);
        },
        watch: {
            selection: function (val) {
                if (val !== null) {
                    const sel = window.getSelection();

                    this.setCaretPosition(sel);
                    this.setActiveElement(sel)
                }
            },
            activeElement: function (val) {
                this.checkTagsVisibility();
                this.checkHelperVisibility();
            },
            childNodesLength: function (val) {
                if (val === 0) {
                    this.activeElement = this.createParagraph();
                    return this.editor.appendChild(this.activeElement)
                }

                this.editor.childNodes.forEach(node => {
                    if (node.nodeName === 'DIV') {
                        const p = this.createParagraph();
                        if (this.activeElement === node) {
                            this.activeElement = p
                        }
                        this.editor.replaceChild(p, node)
                    }
                })
            },
        },
        methods: {
            handleSelection(e) {
                this.selection = e.target.activeElement === this.editor ? e : null;

                this.checkTagsVisibility();
                this.checkHelperVisibility()
            },
            handleKeyPress(e) {
                this.childNodesLength = this.editor.childNodes.length;

                this.checkTagsVisibility();
                this.checkHelperVisibility()
            },
            handleTagChoosing(e) {
                e.handler.call(this, this.editor)
            },
            createParagraph() {
                const el = document.createElement('p');
                el.innerHTML = '<br/>';

                return el
            },
            setCaretPosition(selection) {
                const container = this.editor.getBoundingClientRect(),
                    range = selection.getRangeAt(0);

                if (!range.startContainer.getBoundingClientRect) return;

                const rect = range.startContainer.getBoundingClientRect();

                const btnHeight = 19, offset = (rect.height - btnHeight) / 2;
                this.caretPosition = {x: rect.x - container.x, y: rect.y - container.y + offset};
            },

            setActiveElement(selection) {
                this.activeElement = selection.focusNode;
                if (selection.focusNode.nodeName === 'BR') {
                    this.activeElement = selection.focusNode.parentNode
                }
                if (selection.focusNode.nodeName === '#text') {
                    this.activeElement = selection.focusNode.parentNode
                }
            },
            checkTagsVisibility() {
                if (this.isEmptyEditor()) {
                    return this.isTagsVisible = true
                }
                if (this.activeElement === null) {
                    return this.isTagsVisible = false
                }
                this.isTagsVisible = this.activeElement.nodeName === 'P' && this.activeElement.innerHTML === '<br>'
            },
            checkHelperVisibility() {
                this.isHelperVisible = this.isEmptyEditor()
            },
            isEmptyEditor() {
                if (this.childNodesLength > 1) {
                    return false
                }
                if (this.editor.childNodes[0] === undefined) {
                    return true
                }
                const el = this.editor.childNodes[0];
                return el.innerHTML === '' || el.innerHTML === '<br>'
            }
        }
    }
</script>
<style lang="scss">
    .content-editor-panel {
        position: relative;
    }

    .content-editor-content {
        outline: none;
        white-space: pre-wrap;
    }

    .content-editor-content-helper {
        position: absolute;
        top: 0;
        left: 0;
    }

    .content-editor-uploader {
        position: absolute;
        top: -10000px;
    }
</style>