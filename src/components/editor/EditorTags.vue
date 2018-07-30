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
    export default {
        props: ['position', 'isVisible'],
        data: () => {
            return {
                elements: [
                    {
                        icon: 'format_list_bulleted', label: 'Bulleted list', handler: function () {
                            const ul = document.createElement('ul'),
                                li = document.createElement('li');
                            li.innerHTML = '<br/>';
                            ul.appendChild(li);

                            this.replaceActiveElement(ul)
                        }
                    },
                    {
                        icon: 'format_list_numbered', label: 'Numbered list', handler: function () {
                            const ol = document.createElement('ol'),
                                li = document.createElement('li');
                            li.innerHTML = '<br/>';
                            ol.appendChild(li);

                            this.replaceActiveElement(ol)
                        }
                    },
                    {
                        icon: 'insert_photo', label: 'Upload image', handler: function () {
                            this.$refs.file.setAttribute('accept', 'image/*');
                            this.$refs.file.click()
                        }
                    }
                ],
                style: {top: '1px'},
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
        top: 1px;
    }

    .cards-editor-content-tags {
        background-color: #242424;
        background: -webkit-linear-gradient(top, #242424, rgba(36, 36, 36, 1));
        background: linear-gradient(to bottom, #242424, rgba(36, 36, 36, 1));
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 3px #000;
        position: absolute;
        left: 30px;
        top: -10px;
        color: #fff;
        width: 185px;
        .q-item-side {
            color: #fff;
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
        border-color: transparent #242424 transparent transparent;
        top: 17px;
        left: -10px;
    }
</style>