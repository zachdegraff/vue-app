<template>
    <div class="editor-tools-tooltip animate-popup" v-show="isEditorTools" :style="position">
        <div v-show="!isLinkEditing">
            <q-btn flat icon="format_bold" size="sm" @click="toBold"/>
            <q-btn flat icon="format_italic" size="sm" @click.native="toItalic"/>
            <q-btn flat icon="link" size="sm" @click.native="isLinkEditing=true"/>
        </div>
        <div v-show="isLinkEditing" class="editor-tools-link row">
            <div class="col-xs-8">
                <q-input v-model="linkUrl">
                    <q-autocomplete separator @search="search" :min-characters="2"/>
                </q-input>
            </div>
            <div class="col-xs-4 text-right">
                <q-btn flat label="OK" @click="toLink"/>
                <q-btn flat icon="close" color="red" @click="isLinkEditing=false"/>
            </div>
        </div>
        <i class="editor-tools-dir"></i>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    const APP_HOST = process.env.APP_HOST;

    export default {
        props: ['target'],
        data: () => {
            return {
                event: null,
                start: null,
                finish: null,
                linkUrl: '',
                isLinkEditing: false,
                isEditorTools: false,
                position: {
                    top: '0px',
                    left: '0px',
                }
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current'
            }),
        },
        watch: {
            target: function (val) {
                if (val === null) {
                    return this.isEditorTools = false
                }
                this.handle(val)
            },
            isEditorTools: function (val) {
                if (val === true) return;

                this.linkUrl = '';
                this.isLinkEditing = false
            }
        },
        methods: {
            ...mapActions({
                hints: 'search/cardsHints'
            }),
            wrap(symbol) {
                if (this.event === null) return null;

                const el = this.event.target,
                    selection = el.value.substring(this.start, this.finish);

                return [
                    el.value.slice(0, this.start),
                    `${symbol}${selection}${symbol}`,
                    el.value.slice(this.finish)
                ].join('');
            },
            toBold() {
                const content = this.wrap('*');
                if (content !== null) {
                    this.$emit('format', {content});
                }

                this.isEditorTools = false;
            },
            toLink() {
                if (this.linkUrl === '' || this.event === null) return null;

                const el = this.event.target,
                    selection = el.value.substring(this.start, this.finish),
                    content = [
                        el.value.slice(0, this.start),
                        `[${this.linkUrl}|${selection}]`,
                        el.value.slice(this.finish)
                    ].join('');

                this.$emit('format', {content});

                this.isEditorTools = false;
            },
            toItalic() {
                const content = this.wrap('_');
                if (content !== null) {
                    this.$emit('format', {content});
                }

                this.isEditorTools = false;
            },
            handle(e) {
                if (e.target.nodeName !== 'TEXTAREA') {
                    return;
                }
                this.event = e;
                this.start = this.event.target.selectionStart;
                this.finish = this.event.target.selectionEnd;

                this.isEditorTools = this.start !== this.finish;

                this.setToolsPosition(e);
            },
            params(terms) {
                let params = {terms};
                if (this.team !== null) {
                    params['teamId'] = this.team.id
                }
                return params
            },
            search(terms, done) {
                if (terms.indexOf('htt') !== -1) return done([]);

                this.hints(this.params(terms)).then(items => {
                    const result = items.map(item => {
                        return {
                            ...item,
                            label: item.name,
                            value: APP_HOST + '/cards/' + item.id
                        };
                    });
                    done(result);
                }).catch(() => done([]));
            },
            setToolsPosition(e) {
                if (!this.isEditorTools) return;

                this.position.top = (e.offsetY - 25) + 'px';
                this.position.left = (e.offsetX - 33) + 'px';
            }
        }
    }
</script>
<style lang="scss">
    .editor-tools-tooltip {
        background: #747474;
        border-radius: 2px;
        color: #fafafa;
        min-width: 130px;
        padding: 10px;
        position: absolute;
        -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12);
        z-index: 9000;
        .q-btn {
            padding: 4px 10px;
        }
    }

    .editor-tools-dir {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: #747474 transparent transparent transparent;
        bottom: -10px;
        margin-left: -5px;
        left: 50%;
    }

    .editor-tools-link {
        min-width: 300px;
    }
</style>