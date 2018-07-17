<template>
    <div class="content-editor-panel">
        <div class="content-editor-content-helper" @click="editor.focus()" v-show="isHelperVisible">What is your team wondering?<br/>
            <span class="q-caption">(Hint: Type @ to mention other cards.)</span></div>
        <div id="contentEditor" class="content-editor-content" v-html="card.description"></div>
        <q-progress :percentage="files.uploading" v-show="files.isUploading" ref="progressBar" class="content-editor-progress-bar"/>
        <editor-tags :position="tags.position" :is-visible="tags.isVisible" @choose="handleTagChoosing"/>
        <reference-tools :editor="editor" :medium="medium"></reference-tools>
        <input type="file" class="content-editor-uploader" ref="file" @change="handleUploading"/>
    </div>
</template>
<script>
    import ReferenceTools from './ReferenceTools.vue'
    import MediumOptions from './MediumOptions'
    import EditorTags from './EditorTags.vue'
    import MediumEditor from 'medium-editor'
    import {mapActions} from 'vuex'
    import api from '../../api'

    export default {
        props: ['card'],
        data: () => {
            return {
                editor: null,
                medium: null,
                tags: {
                    position: {},
                    isVisible: false
                },
                files: {
                    progress: 0,
                    isUploading: false
                },
                activeElement: null,
                isHelperVisible: false
            }
        },
        components: {ReferenceTools, EditorTags},
        mounted() {
            this.editor = document.getElementById('contentEditor');
            if (this.editor !== null) {
                this.editor.addEventListener('keyup', this.handleKeyPress);
                this.editor.addEventListener('mouseup', this.handleKeyPress);
                this.editor.addEventListener('click', this.handleLinkClicks);
            }
            this.medium = new MediumEditor('#contentEditor', MediumOptions);
            this.medium.subscribe('editableInput', (e, el) => {
                this.handleKeyPress();
                this.$emit('input', el.innerHTML)
            });
            this.medium.subscribe('blur', (e, el) => this.$emit('blur', el));

            window.addEventListener('resize', this.calcEditorHeight);

            this.checkTagsVisibility();
            this.calcEditorHeight()
        },
        watch: {
            card: function (val) {
                if (val === null) return;

                this.tags.isVisible = false;
                this.isHelperVisible = false;

                if (this.medium !== null) {
                    this.medium.setContent(val.description)
                }
            }
        },
        methods: {
            ...mapActions({
                changeActiveCard: 'editor/open',
            }),
            handleKeyPress() {
                this.setActiveElement();
                this.setCaretPosition();

                this.checkTagsVisibility()
            },
            handleTagChoosing(e) {
                this.tags.isVisible = false;
                e.handler.call(this, this.medium)
            },
            handleLinkClicks(e) {
                if (e.target.nodeName !== 'A') return true;

                const matches = e.target.href.match(/\/cards\/([0-9]+)/);
                if (matches !== null) {
                    e.preventDefault();
                    this.changeActiveCard(parseInt(matches[1]))
                }
                return true
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
                api.files.uploadEditorFile(this.card.id, form, config).then(res => {
                    let content = res.data.tag, isImg = res.data.tag.indexOf('<img') !== -1;
                    if (isImg) {
                        content = `${res.data.tag}`
                    }
                    this.activeElement.innerHTML = content;
                    if (isImg) {
                        this.tags.isVisible = false;
                        const p = this.createParagraph();
                        this.activeElement.parentNode.insertBefore(p, this.activeElement.nextSibling)
                    }
                    this.$refs.file.value = ''
                })
            },
            replaceActiveElement(el) {
                if (this.activeElement === null) return;

                this.activeElement.parentNode.replaceChild(el, this.activeElement);
                this.medium.selectElement(el.firstChild);
                this.medium.trigger('editableInput', {}, this.editor)
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
                if (document.activeElement !== this.editor) return;

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
                this.isHelperVisible = this.isEmptyEditor();
                if (this.isHelperVisible) {
                    return this.tags.isVisible = true
                }
                if (this.activeElement === null) {
                    return this.tags.isVisible = false
                }
                this.tags.isVisible = this.activeElement.nodeName === 'P' && this.activeElement.innerHTML === '<br>'
            },
            calcEditorHeight() {
                if (this.editor === null) return;

                const container = document.querySelector('.cards-editor-main'),
                    top = document.querySelector('.cards-editor-top'),
                    height = container.offsetHeight - top.offsetHeight - 20;

                this.editor.style.height = `${height}px`
            },
            isEmptyEditor() {
                if (this.editor.childNodes[0] === undefined) {
                    return true
                }
                if (this.editor.childNodes.length > 1) {
                    return false
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
        color: #424242;
        font-size: 1.125rem;
        outline: none;
        overflow: scroll;
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

    .medium-editor-toolbar {
        z-index: 6001;
    }
</style>