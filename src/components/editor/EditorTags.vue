<template>
    <div class="cards-editor-content-add" :style="style" v-show="isVisible">
        <q-btn outline round color="primary" icon="add" size="6px" @click="showList"/>
        <div class="cards-editor-content-tags" v-show="isListShown">
            <q-list no-border dense link>
                <q-item v-for="(item, idx) in elements" :key="idx" @click.native="$emit('choose', item)">
                    <q-item-side>
                        <q-item-tile>
                            <span v-if="item.text">{{item.text}}</span>
                            <q-icon :name="item.icon" color="white" v-if="item.icon"/>
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main :label="item.label"/>
                </q-item>
            </q-list>
            <i class="cards-editor-content-tags-dir"></i>
        </div>
    </div>
</template>
<script>
    import {selectNode, setCaretAtEnd} from '../../helpers'

    export default {
        props: ['position', 'isVisible'],
        data: () => {
            return {
                elements: [
                    {
                        text: 'H1', label: 'Large heading', handler: function (content) {
                            const el = document.createElement('h1');
                            el.innerHTML = 'Large heading';

                            content.replaceChild(el, this.activeElement);
                            selectNode(el)
                        }
                    },
                    {
                        text: 'H2', label: 'Medium heading', handler: function (content) {
                            const el = document.createElement('h2');
                            el.innerHTML = 'Medium heading';

                            content.replaceChild(el, this.activeElement);
                            selectNode(el)
                        }
                    },
                    {
                        text: 'H3', label: 'Small heading', handler: function (content) {
                            const el = document.createElement('h3');
                            el.innerHTML = 'Small heading';

                            content.replaceChild(el, this.activeElement);
                            selectNode(el)
                        }
                    },
                    {
                        icon: 'format_list_bulleted', label: 'Bulleted list', handler: function (content) {
                            const ul = document.createElement('ul'),
                                li = document.createElement('li');
                            li.innerHTML = '<br/>';
                            ul.appendChild(li);

                            content.replaceChild(ul, this.activeElement);
                            selectNode(li)
                        }
                    },
                    {
                        icon: 'format_list_numbered', label: 'Numbered list', handler: function (content) {
                            const ul = document.createElement('ol'),
                                li = document.createElement('li');
                            li.innerHTML = '<br/>';
                            ul.appendChild(li);

                            content.replaceChild(ul, this.activeElement);
                            selectNode(li)
                        }
                    },
                    {
                        icon: 'check_circle', label: 'Task list', handler: function (content) {

                        }
                    },
                    {
                        icon: 'link', label: 'Link', handler: function (content) {
                            const node = document.createElement('p');
                            node.innerHTML = '@';


                            content.replaceChild(node, this.activeElement);
                            setCaretAtEnd(node)
                        }
                    },
                    {
                        icon: 'attach_file', label: 'Upload file', handler: function (content) {
                            this.$refs.file.click()
                        }
                    },
                    {
                        icon: 'insert_photo', label: 'Upload image', handler: function (content) {
                            this.$refs.file.click()
                        }
                    },
                    {
                        icon: 'format_quote', label: 'Quote', handler: function (content) {
                            const quote = document.createElement('blockquote');
                            quote.innerHTML = '<br/>';

                            content.replaceChild(quote, this.activeElement);
                            selectNode(quote)
                        }
                    },
                    {
                        icon: 'remove', label: 'Horizontal line', handler: function (content) {
                            const node = document.createElement('p');
                            node.innerHTML = '<hr/><br/>';

                            content.replaceChild(node, this.activeElement);
                        }
                    },
                ],
                style: {top: '-3px'},
                isListShown: false
            }
        },
        watch: {
            position: function (val) {
                if (val === null) return;

                this.style.top = (val.y - 3) + 'px'
            },
            isVisible: function (val) {
                if (val === false) {
                    this.isListShown = false
                }
            }
        },
        created() {
            document.body.addEventListener('click', (e) => {
                this.isListShown = false;
            }, true);
        },
        methods: {
            append(el, pos) {
                this.content.innerHTML = this.content.innerHTML + el;
                this.focus(pos);
            },
            showList() {
                this.isListShown = true
            }
        }
    }
</script>
<style lang="scss">
    .cards-editor-content-add {
        position: absolute;
        left: -25px;
        top: -3px;
    }

    .cards-editor-content-tags {
        background: #2fab64;
        border-radius: 2px;
        position: absolute;
        left: 30px;
        top: -10px;
        color: #fff;
        width: 185px;
        .q-item-side {
            font-size: .8rem;
            min-width: 20px;
        }
    }

    .cards-editor-content-tags-dir {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: transparent #2fab64 transparent transparent;
        top: 17px;
        left: -10px;
    }
</style>