<template>
    <div class="reference-tools-tooltip animate-popup" v-show="isReferenceTools" :style="position">
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
                    :key="idx"
                    :icon="item.icon"
                    :label="item.name"
                    :class="{active: idx === caret}"
                    @click="select(item)"
            />
            <hr v-show="query.length > 1"/>
            <q-btn flat icon="add" label="Create card" @click="create" :disabled="isCreating" v-show="query.length > 1" :class="{active: caret === items.length}"/>
        </div>
        <i class="reference-tools-dir" :class="sideClass"></i>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import {route, guid} from '../../helpers'

    const APP_HOST = process.env.APP_HOST;

    export default {
        props: ['editor', 'medium'],
        data: () => {
            return {
                items: [],
                cache: {},
                start: -1,
                query: '',
                caret: 0,
                space: [32, 160],  // New Line, Space
                controls: [62, 64], // >, @
                isReferenceTools: false,
                side: 'bottom',
                position: {
                    left: '0px',
                }
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                tags: 'search/getQueryTags',
                isCreating: 'cards/isCreating',
                isProcessing: 'search/isHinting',
                recentlyCards: 'cards/getRecentlyUpdated',
                recentlyTags: 'tags/getRecentlyUpdated'
            }),
            defaults() {
                let items = [];
                this.recentlyCards.forEach(card => items.push({
                    id: card.id,
                    name: card.name,
                    icon: 'note',
                    type: 'card'
                }));
                this.recentlyTags.forEach(tag => items.push({
                    id: tag.id,
                    name: tag.name,
                    icon: 'local_offer',
                    type: 'tag'
                }));
                return items
            },
            sideClass() {
                if (this.side === 'top') {
                    return 'on-top'
                }
                return 'on-bottom'
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
            editor: function (val) {
                val.addEventListener('keydown', this.preventNavigation);

                val.addEventListener('keyup', this.handle);
                val.addEventListener('mousedown', this.handle)
            },
            isReferenceTools: function (val) {
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
                hints: 'search/hints',
                addCards: 'editor/batch',
                createCard: 'cards/create'
            }),
            create() {
                const params = {
                    name: this.query,
                    teamId: this.team.id,
                    description: '<p><br></p>',
                    tags: this.tags
                };
                this.createCard(params).then(res => {
                    const card = res.card,
                        url = APP_HOST + route('view_card', {id: card.id});

                    const link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute('id', guid());
                    link.innerText = card.name;

                    this.insert(link);

                    this.addCards([card]).then(() => this.focusOnLink(link))
                })
            },
            handle(e) {
                const sel = document.getSelection(), node = sel.focusNode;
                if (node === null || node.nodeName !== '#text') {
                    return this.isReferenceTools = false
                }
                this.range = sel.getRangeAt(0);
                this.start = this.getStartPos();
                this.isReferenceTools = this.start !== -1;

                if (this.start !== -1) {
                    this.setQueryString();
                    this.setToolsPosition();
                    this.handleNavigation(e)
                }
            },
            select(item) {
                const link = document.createElement('a');
                link.setAttribute('href', this.getLinkUrl(item));
                link.setAttribute('id', guid());
                link.innerText = item.name;

                this.insert(link);
                this.focusOnLink(link)
            },
            insert(link) {
                const sel = document.getSelection(),
                    range = document.createRange(),
                    node = sel.focusNode;

                node.nodeValue = [
                    node.nodeValue.substring(0, this.start),
                    node.nodeValue.substring(sel.focusOffset)
                ].join('');

                range.setStart(node, this.start);
                range.insertNode(link);
                range.setStartAfter(link);
                range.collapse(true);

                sel.removeAllRanges();
                sel.addRange(range);

                this.medium.setContent(this.editor.innerHTML);

                this.isReferenceTools = false
            },
            focusOnLink(link) {
                const el = document.getElementById(link.getAttribute('id')),
                    sel = document.getSelection(),
                    range = sel.getRangeAt(0);

                if (el === null) return;

                range.setStart(el.parentElement, 0);
                range.setStartAfter(el);
                range.collapse(true);

                sel.removeAllRanges();
                sel.addRange(range)
            },
            isInChars(str, idx, chars = []) {
                for (let i in chars) {
                    if (str.charCodeAt(idx) === chars[i]) {
                        return true
                    }
                }
                return false
            },
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
            handleNavigation(e) {
                if (this.isReferenceTools === false) return;

                e.preventDefault();
                if (e.keyCode === 38) { // up
                    this.caret = this.caret === 0 ?
                        (this.query.length > 1 ? this.items.length : this.items.length - 1) :
                        this.caret - 1
                }
                if (e.keyCode === 40) { // down
                    if (this.caret === this.items.length) {
                        return this.caret = 0
                    }
                    this.caret = this.caret === this.items.length - 1 ?
                        (this.query.length > 1 ? this.items.length : 0) :
                        this.caret + 1
                }
                if (e.keyCode === 13) { // enter
                    if (this.items.length === 0 || this.caret === this.items.length) {
                        if (this.query.length > 1) {
                            return this.create()
                        }
                    }
                    this.select(this.items[this.caret]);
                }
            },
            getStartPos() {
                const sel = document.getSelection();
                if (sel.isCollapsed === false) {
                    return -1;
                }
                const str = sel.focusNode.nodeValue;
                for (let i = sel.focusOffset - 1; i >= 0; --i) {
                    if (str.charCodeAt(i) === 10) {
                        return -1;
                    }
                    if (this.isInChars(str, i, this.space)) {
                        if (i > 0) {
                            if (this.isInChars(str, i - 1, this.space)) {
                                return -1
                            }
                        }
                    }
                    if (this.isInChars(str, i, this.controls)) {
                        if (i === 0 || this.isInChars(str, i - 1, this.space)) {
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
                return APP_HOST + route('tag_cards', {name: item.name})
            },
            setQueryString() {
                const selection = document.getSelection(),
                    node = selection.focusNode;

                this.query = node.nodeValue.substring(this.start + 1, selection.focusOffset)
            },
            setToolsPosition() {
                const parent = document.querySelector('.cards-editor').getBoundingClientRect(),
                    container = document.querySelector('.content-editor-panel').getBoundingClientRect(),
                    range = document.getSelection().getRangeAt(0).cloneRange(),
                    max = parent.top + (parent.height / 2);
                range.collapse(true);

                const rect = range.getClientRects()[0];
                this.position.left = (rect.left - container.left - 100) + 'px';
                if (rect.top > max) {
                    this.position.bottom = (container.bottom - rect.top + 5) + 'px';
                    return this.side = 'top'
                }
                this.position.top = (rect.bottom - container.top + 5) + 'px';
                this.side = 'bottom'
            },
            preventNavigation(e) {
                if (this.isReferenceTools === true && this.isNavChars(e)) {
                    e.preventDefault();
                }
            }
        }
    }
</script>
<style lang="scss">
    .reference-tools-tooltip {
        background-color: #242424;
        background: -webkit-linear-gradient(top, #242424, rgba(36, 36, 36, 1));
        background: linear-gradient(to bottom, #242424, rgba(36, 36, 36, 1));
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 3px #000;
        color: #fafafa;
        padding: 10px;
        position: absolute;
        width: 250px;
        z-index: 9000;
        .q-btn {
            padding: 4px 11px;
            display: block;
            &.active {
                background: rgba(255, 255, 255, 0.1);
            }
            .q-btn-inner {
                div {
                    width: 174px;
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
        &.on-top {
            border-color: #242424 transparent transparent transparent;
            bottom: -10px;
            margin-left: -5px;
            left: 100px;
        }
        &.on-bottom {
            border-color: transparent transparent #242424 transparent;
            top: -10px;
            margin-left: -5px;
            left: 100px;

        }
    }
</style>