<template>
    <div class="content-editor-panel">
        <div class="content-editor-content-helper" @click="editor.focus()" v-show="isHelperVisible">What is your team wondering?<br/>
            <span class="q-caption">(Hint: Type @ to create and mention other cards.)</span></div>
        <div id="contentEditor" class="content-editor-content"></div>
        <q-progress :percentage="files.uploading" v-show="files.isUploading" ref="progressBar" class="content-editor-progress-bar"/>
        <editor-tags :position="tags.position" :is-visible="tags.isVisible" @choose="handleTagChoosing"/>
        <reference-tools :editor="editor" :medium="medium"></reference-tools>
        <anchor-helper :medium="medium"></anchor-helper>
        <input type="file" class="content-editor-uploader" ref="file" @change="handleUploading"/>
    </div>
</template>
<script>
    import ReferenceTools from './ReferenceTools.vue'
    import AnchorHelper from './AnchorHelper.vue'
    import MediumOptions from './MediumOptions'
    import EditorTags from './EditorTags.vue'
    import MediumEditor from 'medium-editor'
    import {mapGetters, mapActions} from 'vuex'
    import api from '../../api'

    export default {
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
        computed: {
            ...mapGetters({
                card: 'editor/getActiveCard'
            })
        },
        components: {ReferenceTools, EditorTags, AnchorHelper},
        created() {
            window.addEventListener('wheel', this.handlePageWheel);
            document.addEventListener('keydown', this.handleArrowScroll);
        },
        mounted() {
            setTimeout(this.initialize, 100)
        },
        destroyed() {
            window.removeEventListener('wheel', this.handlePageWheel);
            document.removeEventListener('keydown', this.handleArrowScroll);
        },
        watch: {
            card: function (val) {
                if (val === undefined) return;
                if (this.medium !== null) {
                    this.medium.setContent(val.description || '<p><br></p>', 0)
                }
                this.tags.isVisible = false;
                this.isHelperVisible = this.isEmptyEditor()
            }
        },
        methods: {
            ...mapActions({
                save: 'editor/save',
                open: 'editor/open',
            }),
            initialize() {
                this.editor = document.getElementById('contentEditor');
                if (this.editor !== null) {
                    this.editor.addEventListener('keydown', this.handleKeyPress);
                    this.editor.addEventListener('mouseup', this.handleKeyPress);
                    this.editor.addEventListener('click', this.handleLinkClicks);
                }
                this.medium = new MediumEditor('#contentEditor', MediumOptions);
                if (this.card) {
                    this.medium.setContent(this.card.description || '<p><br></p>', 0)
                }
                this.medium.subscribe('blur', this.save);
                this.medium.subscribe('focus', this.handleKeyPress);
                this.medium.subscribe('editableInput', this.handleKeyPress);

                this.checkTagsVisibility()
            },
            handleKeyPress(e) {
                if (e instanceof KeyboardEvent) {
                    if (e.keyCode === 8 && this.isEmptyEditor()) {
                        e.preventDefault();
                    }
                }
                this.card.description = this.editor.innerHTML;

                this.setActiveElement();
                this.setCaretPosition();

                this.checkTagsVisibility()
            },
            handlePageWheel(e) {
                if (this.editor === null) return;
                const modal = document.querySelector('.app-modal');

                if (e.target !== modal) return;

                e.preventDefault();
                this.editor.scrollTop += e.deltaY
            },
            handleArrowScroll(e) {
                if (this.editor === null) return;
                if (document.activeElement === this.editor) return;

                const tool = document.querySelector('.reference-tools-tooltip');
                if (tool !== null) {
                    const style = window.getComputedStyle(tool);
                    if (style.display !== 'none') return;
                }

                const arrows = [38, 40];
                if (arrows.indexOf(e.keyCode) === -1) return;

                e.preventDefault();
                let offset = 50;
                if (e.keyCode === 38) {
                    offset *= -1;
                }

                this.editor.scrollTop += offset
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
                    this.open(parseInt(matches[1]))
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
                        const p = document.createElement('p');
                        p.innerHTML = '<br/>';

                        this.activeElement.parentNode.insertBefore(p, this.activeElement.nextSibling)
                    }
                    this.medium.trigger('editableInput', {}, this.editor);
                    this.$refs.file.value = ''
                })
            },
            replaceActiveElement(el) {
                if (this.activeElement === null) return;

                this.activeElement.parentNode.replaceChild(el, this.activeElement);
                this.medium.selectElement(el.firstChild);
                this.medium.trigger('editableInput', {}, this.editor)
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

                if (selection.focusNode === null) return;

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
                if (document.activeElement !== this.editor) {
                    return this.tags.isVisible = false
                }
                if (this.isHelperVisible) {
                    return this.tags.isVisible = true
                }
                if (this.activeElement === null) {
                    return this.tags.isVisible = false
                }
                this.tags.isVisible = this.activeElement.nodeName === 'P' && this.activeElement.innerHTML === '<br>'
            },
            isEmptyEditor() {
                if (this.editor === null) return false;
                if (this.editor.childNodes[0] === undefined) return true;
                if (this.editor.childNodes.length > 1) return false;

                const el = this.editor.childNodes[0];
                return el.innerHTML === '' || el.innerHTML === '<br>'
            }
        }
    }
</script>
<style lang="scss">
    .content-editor-panel {
        position: relative;
        height: 100%;
    }

    .content-editor-content {
        color: #424242;
        font-size: 1.125rem;
        line-height: 1.5em;
        outline: none;
        img {
            max-width: 100%;
            max-height: 250px;
            margin: 0 auto;
        }
    }

    .content-editor-content-helper {
        position: absolute;
        top: 3px;
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

    .medium-editor-anchor-preview {
        z-index: 7000;
        a {
            text-decoration: none;
            margin: 5px 10px;
            font-size: .95rem;
        }
    }
</style>