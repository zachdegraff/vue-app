<template>
    <div class="content-editor-panel">
        <div class="content-editor-content-helper" @click="editor.focus()" v-show="isHelperVisible">Type here card description. Type @ to link to cards or collections.</div>
        <div id="contentEditor" class="content-editor-content" contenteditable="true">
            <p><br/></p>
        </div>
        <q-progress :percentage="files.uploading" v-show="files.isUploading" ref="progressBar" class="content-editor-progress-bar"/>
        <editor-tags :position="tags.position" :is-visible="tags.isVisible" @choose="handleTagChoosing"/>
        <reference-tools :editor="editor"></reference-tools>
        <input type="file" class="content-editor-uploader" ref="file" @change="handleUploading"/>
    </div>
</template>
<script>
    import ReferenceTools from './ReferenceTools.vue'
    import FormatTools from './FormatTools.vue'
    import EditorTags from './EditorTags.vue'
    import api from '../../api'

    export default {
        data: () => {
            return {
                editor: null,
                tags: {
                    position: {},
                    isVisible: false
                },
                files: {
                    progress: 0,
                    isUploading: false
                },
                activeElement: null,
                childNodesLength: 0,
                isHelperVisible: false
            }
        },
        components: {ReferenceTools, EditorTags, FormatTools},
        mounted() {
            this.editor = document.getElementById('contentEditor');
            this.editor.addEventListener('keyup', this.handleKeyPress);
            this.editor.addEventListener('mouseup', this.handleKeyPress);

            this.childNodesLength = this.editor.childNodes.length;
            if (this.childNodesLength !== 0) {
                this.activeElement = this.editor.childNodes[this.editor.childNodes.length - 1]
            }

            this.checkTagsVisibility();
            this.checkHelperVisibility();
        },
        watch: {
            activeElement: function () {
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
            handleKeyPress(e) {
                this.childNodesLength = this.editor.childNodes.length;

                this.setActiveElement();
                this.setCaretPosition();

                this.checkTagsVisibility();
                this.checkHelperVisibility()
            },
            handleTagChoosing(e) {
                e.handler.call(this, this.editor)
            },
            handleUploading(e) {
                let file = e.target.files[0];
                if (file === undefined) return false;

                const form = new FormData(),
                    config = {
                        onUploadProgress: e => {
                            this.files.progress = (e.loaded * 100) / e.total;
                            this.files.isUploading = this.files.progress < 100
                        }
                    };
                form.append('file', file);

                this.files.progress = 0;
                this.files.isUploading = true;
                api.files.uploadEditorFile(68, form, config).then(res => {
                    let content = res.data.tag, isImg = res.data.tag.indexOf('<img') !== -1;
                    if (isImg) {
                        content = `<div class="text-center">${res.data.tag}</div>`
                    }
                    this.activeElement.innerHTML = content;
                    if (isImg) {
                        this.flushHelpers();
                        const p = this.createParagraph();
                        this.activeElement.parentNode.insertBefore(p, this.activeElement.nextSibling);
                    }
                    this.$refs.file.value = ''
                })
            },
            flushHelpers() {
                this.tags.isVisible = false;
                this.isHelperVisible = false;
            },
            createParagraph() {
                const el = document.createElement('p');
                el.innerHTML = '<br/>';

                return el
            },
            setCaretPosition() {
                if (this.activeElement === null) return;

                const container = this.editor.getBoundingClientRect(),
                    rect = this.activeElement.getBoundingClientRect();

                const btnHeight = 19, offset = (rect.height - btnHeight) / 2;

                this.tags.position = {x: rect.x - container.x, y: rect.y - container.y + offset};
                this.$refs.progressBar.$el.style.top = this.tags.position.y + 'px'
            },
            setActiveElement() {
                const selection = document.getSelection();

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
                    return this.tags.isVisible = true
                }
                if (this.activeElement === null) {
                    return this.tags.isVisible = false
                }
                this.tags.isVisible = this.activeElement.nodeName === 'P' && this.activeElement.innerHTML === '<br>'
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
        img {
            max-width: 100%;
            margin: 0 auto;
        }
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

    .content-editor-progress-bar {
        position: absolute;
        top: 100px;
        left: 0;
        width: 100%;
    }
</style>