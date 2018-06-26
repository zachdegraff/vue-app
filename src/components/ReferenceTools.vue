<template>
    <div class="reference-tools-tooltip animate-popup" ref="container" v-show="isReferenceTools" :style="position">
        <div class="reference-tools-hint">Type to filter ...</div>
        <div class="row text-center" v-show="isProcessing">
            <div class="col">
                <q-spinner :size="30" color="white"/>
            </div>
        </div>
        <div class="reference-tools-items">
            <q-btn
                    flat
                    v-for="(item, idx) in items"
                    :key="item.id"
                    :icon="item.icon"
                    :label="item.name"
                    :class="{active: idx === caret}"
                    @click="select(item)"
            />
        </div>
        <i class="reference-tools-dir"></i>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import {route} from '../helpers'
    import caretXY from 'caret-xy'

    const APP_HOST = process.env.APP_HOST;

    export default {
        props: ['keyEvent', 'mouseEvent'],
        data: () => {
            return {
                items: [],
                cache: {},
                start: -1,
                query: '',
                caret: 0,
                target: null,
                space: [10, 32],  // New Line, Space
                controls: [62, 64], // >, @
                isReferenceTools: false,
                position: {
                    top: '0px',
                    left: '0px',
                }
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'search/isHinting',
                recentlyCards: 'cards/getRecentlyUpdated',
                recentlyCollections: 'collections/getRecentlyUpdated'
            }),
            defaults() {
                let items = [];
                this.recentlyCards.forEach(card => items.push({
                    id: card.id,
                    name: card.name,
                    icon: 'note',
                    type: 'card'
                }));
                this.recentlyCollections.forEach(collection => items.push({
                    id: collection.id,
                    name: collection.name,
                    icon: 'collections',
                    type: 'collection'
                }));
                return items
            }
        },
        watch: {
            query: function (val) {
                if (val.length < 2) return;

                this.caret = 0;
                this.items = [];
                if (this.cache[val] !== undefined) {
                    return this.items = this.cache[val];
                }
                this.hints({terms: val}).then(items => {
                    this.items = items;
                    this.cache[val] = items
                });
            },
            keyEvent: function (val) {
                this.handle(val)
            },
            mouseEvent: function (val) {
                if (val !== null) {
                    if (val.target.nodeName !== 'TEXTAREA') {
                        return
                    }
                }

                this.handle(val)
            },
            isReferenceTools: function (val) {
                this.$emit('toggle', {state: val});
                if (val === true) {
                    this.caret = 0;
                    if (this.cache[this.query] !== undefined) {
                        return this.items = this.cache[this.query]
                    }

                    return this.items = this.defaults
                }
            }
        },
        created() {
            this.items = this.defaults;
        },
        methods: {
            ...mapActions({
                url: 'route/url',
                hints: 'search/hints'
            }),
            handle(e) {
                this.target = e ? e.target : null;
                if (e === null) {
                    return this.isReferenceTools = false
                }
                this.handleNavigation(e);
                this.start = this.getStartPos();
                this.isReferenceTools = this.start !== -1;

                if (this.start !== -1) {
                    this.setToolsPosition();
                    this.query = this.target.value.substring(this.start + 1, this.target.selectionEnd)
                }
            },
            select(item) {
                const el = this.target,
                    content = [
                        el.value.slice(0, this.start),
                        `[${this.getLinkUrl(item)}|${item.name}] `,
                        el.value.slice(this.target.selectionEnd)
                    ].join('');

                this.$emit('format', {content});

                this.isReferenceTools = false;

                el.focus();
            },
            isInChars(str, idx, chars = []) {
                for (let i in chars) {
                    if (str.charCodeAt(idx) === chars[i]) {
                        return true
                    }
                }
                return false
            },
            handleNavigation(e) {
                if (this.isReferenceTools === false || this.items.length === 0) return;

                if (e.keyCode === 38) { // up
                    this.caret = this.caret === 0 ? this.items.length - 1 : this.caret - 1
                }
                if (e.keyCode === 40) { // down
                    this.caret = this.caret === this.items.length - 1 ? 0 : this.caret + 1
                }
                if (e.keyCode === 13) { // enter
                    this.select(this.items[this.caret]);
                    this.$refs.container.style.display = 'none';
                }
            },
            getStartPos() {
                const target = this.target;
                if (target.selectionStart !== target.selectionEnd) {
                    return -1;
                }
                if (target.selectionEnd === 0) {
                    return -1;
                }
                for (let i = target.selectionEnd - 1; i >= 0; --i) {
                    if (this.isInChars(target.value, i, this.space)) {
                        return -1
                    }
                    if (this.isInChars(target.value, i, this.controls)) {
                        if (i === 0 || this.isInChars(target.value, i - 1, this.space)) {
                            return i
                        }
                    }
                }
                return -1
            },
            getLinkUrl(item) {
                if (item.type === 'card') {
                    return APP_HOST + route('view_card', {id: item.id})
                }
                return APP_HOST + route('collection_cards', {name: item.name})
            },
            setToolsPosition() {
                const caretPos = caretXY(this.target, this.start),
                    targetPos = this.target.getBoundingClientRect();

                this.position.top = (caretPos.height + caretPos.top - targetPos.top + 50) + 'px';
                this.position.left = (caretPos.left - targetPos.left - 58) + 'px'
            }
        }
    }
</script>
<style lang="scss">
    .reference-tools-tooltip {
        background: #747474;
        border-radius: 2px;
        color: #fafafa;
        padding: 10px;
        position: absolute;
        width: 200px;
        -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12);
        z-index: 9000;
        .q-btn {
            padding: 4px 11px;
            display: block;
            &.active {
                background: rgba(255, 255, 255, 0.1);
            }
            .q-btn-inner {
                div {
                    width: 126px;
                    text-align: left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .reference-tools-hint {
        color: #ddd;
        padding: 3px 10px 5px;
        font-size: .8rem;
    }

    .reference-tools-items {
        a {
            color: #fff;
            display: block;
            padding: 3px 0;
            text-decoration: none;
            i {
                vertical-align: middle;
                margin-right: 5px;
            }
        }
        & + div {
            margin-top: 10px;
        }
    }

    .reference-tools-dir {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #747474 transparent;
        top: -10px;
        margin-left: -5px;
        left: 100px;
    }
</style>