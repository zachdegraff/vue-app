<template>
    <div class="medium-editor-anchor-helper" v-show="isVisible" ref="container" :style="position">
        <q-btn
                flat
                v-for="item in items"
                :key="item.id"
                :icon="item.icon"
                :label="item.name"
                align="left"
                class="full-width"
                @click="select(item)"
        />
    </div>
</template>
<script>
    import {mapActions} from 'vuex'

    const APP_HOST = process.env.APP_HOST;

    export default {
        props: ['medium'],
        data: () => {
            return {
                items: [],
                query: '',
                target: null,
                position: {},
            }
        },
        watch: {
            query: function (val) {
                if (val.length < 2) return;

                this.hints({terms: val}).then(items => this.items = items);
            },
            medium: function (val) {
                if (val === null) return;

                val.subscribe('showToolbar', () => {
                    if (this.target === null) {
                        this.target = document.querySelector('.medium-editor-toolbar-input');
                        this.target.addEventListener('keypress', this.handleKeyPress)
                    }
                });
                val.subscribe('positionedToolbar', this.setPosition);

                document.querySelector('body').appendChild(this.$refs.container);
            }
        },
        computed: {
            isVisible() {
                if (this.query === '') {
                    return false
                }
                return this.items.length > 1
            }
        },
        methods: {
            ...mapActions({
                hints: 'search/cardsHints'
            }),
            select(item) {
                if (this.target === null) return;

                const ext = this.medium.getExtensionByName('anchor');
                ext.getInput().value = `${APP_HOST}/cards/${item.id}`;
                ext.doFormSave();

                this.query = ''
            },
            setPosition() {
                const toolbar = document.querySelector('.medium-editor-toolbar-active');

                this.position = {
                    top: (toolbar.offsetTop + 50) + 'px',
                    left: toolbar.offsetLeft + 'px'
                }
            },
            handleKeyPress(e) {
                if (this.target === null) return;

                this.query = this.target.value
            }
        }
    }
</script>
<style lang="scss">
    .medium-editor-anchor-helper {
        background-color: #242424;
        background: -webkit-linear-gradient(top, #242424, rgba(36, 36, 36, 1));
        background: linear-gradient(to bottom, #242424, rgba(36, 36, 36, 1));
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 3px #000;
        color: #fafafa;
        position: absolute;
        z-index: 6002;
        button {
            display: block;
        }
    }

    .medium-editor-toolbar-form {
        z-index: 1000;
    }
</style>