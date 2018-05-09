<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <app-modal-layout v-if="model">
            <q-toolbar slot="header">
                <q-toolbar-title>{{model.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row layout-padding gutter-md">
                <div class="card-content col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <h4>{{model.name}}</h4>
                    <div>{{model.description}}</div>

                    <div class="q-pt-md" v-if="model.shorthands.length > 0">
                        <div class="text-bold q-pb-sm">Shorthand</div>
                        <q-chip color="primary" class="q-mr-sm" v-for="(tag, idx) in model.shorthands" :key="idx">
                            {{tag}}
                        </q-chip>
                    </div>
                    <div class="q-pt-md" v-if="model.resources.length > 0">
                        <div class="text-bold q-pb-sm">Resources</div>
                        <q-btn
                                v-for="(item, idx) in model.resources"
                                :key="item.id"
                                class="block q-mb-sm"
                                :label="slide(idx)"
                                outline color="primary"
                                @click="redirect(item.content)"
                        />
                    </div>
                    <div class="q-pt-md" v-if="model.concepts.length > 0">
                        <div class="text-bold q-pb-sm">Related Concepts</div>
                        <q-btn
                                v-for="(item, idx) in model.concepts"
                                :key="item.id"
                                class="block q-mb-sm"
                                :label="slide(idx)"
                                outline color="primary"
                                @click="redirect(item.content)"
                        />
                    </div>
                    <div class="card-mobile-actions lt-sm">
                        <q-icon name="menu"/>
                        <q-popover>
                            <q-list separator link>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile class="uppercase">ask the team</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile class="uppercase">save</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile class="uppercase">edit card</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                    <div class="q-mb-md gt-xs">
                        <div class="q-mb-md text-bold">Actions</div>
                        <q-btn label="ask the team" color="primary" class="full-width q-mb-sm"/>
                        <q-btn label="save" color="primary" class="full-width q-mb-sm"/>
                        <q-btn label="edit card" color="primary" class="full-width q-mb-sm" @click="$router.push({name: 'edit_card', params: {id}})"/>
                    </div>
                    <em>Last updated on April 22 2017 by Dr Ayelet Ruscio</em>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import CardResource from '../../resources/card/CardResource';
    import AppModalLayout from '../../components/context/modal/AppModalLayout'

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => {
            return {
                model: null,
                isOpen: true
            }
        },
        created() {
            this.load()
        },
        components: {
            AppModalLayout
        },
        methods: {
            load() {
                const item = this.$store.getters['cards/getItemById'](this.id);
                if (null !== item) {
                    return this.model = item
                }
                CardResource.get(this.id).then(({data}) => this.model = data.data)
            },
            slide(idx) {
                return `Lecture slides #${idx + 1}`
            },
            close() {
                const path = this.$store.getters['route/previous'];
                if (path === null) {
                    return this.$router.push({name: 'cards_list'})
                }
                this.$router.push(path)
            },
            redirect(link) {
                window.location.href = link;
            }
        }
    }
</script>
<style lang="scss">
    .card-content {
        position: relative;
    }

    .card-mobile-actions {
        position: absolute;
        font-size: 1.5em;
        right: 10px;
        top: 20px;
        width: 150px;
        text-align: right;
    }
</style>