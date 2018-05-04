<template>
    <q-page>
        <div class="page-search-form row justify-center bg-blue-3">
            <q-search v-model="query" class="col-sx-12 col-md-8 bg-white q-pa-md">
                <q-popover v-show="query===''">
                    <div class="row">
                        <q-list class="col">
                            <q-list-header inset>Folders</q-list-header>
                            <q-item>
                                <q-item-side icon="folder" inverted color="primary"/>
                                <q-item-main>
                                    <q-item-tile label>Photos</q-item-tile>
                                    <q-item-tile sublabel>February 22, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info" color="green"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="folder" inverted color="secondary"/>
                                <q-item-main>
                                    <q-item-tile label>Movies</q-item-tile>
                                    <q-item-tile sublabel>March 1st, 2017</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="folder" inverted color="amber"/>
                                <q-item-main>
                                    <q-item-tile label>Games</q-item-tile>
                                    <q-item-tile sublabel>Latest</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item-separator inset/>
                            <q-list-header inset>Files</q-list-header>
                            <q-item>
                                <q-item-side icon="assignment" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Expenses spreadsheet</q-item-tile>
                                    <q-item-tile sublabel>March 2nd, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="place" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Places to visit</q-item-tile>
                                    <q-item-tile sublabel>February 22, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info" color="amber"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="library_music" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>My favorite song</q-item-tile>
                                    <q-item-tile sublabel>Singing it all day</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="videogame_asset" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Quasar Game</q-item-tile>
                                    <q-item-tile sublabel>Have fun while building apps</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                        </q-list>
                        <q-list class="col">
                            <q-list-header inset>Folders</q-list-header>
                            <q-item>
                                <q-item-side icon="folder" inverted color="primary"/>
                                <q-item-main>
                                    <q-item-tile label>Photos</q-item-tile>
                                    <q-item-tile sublabel>February 22, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info" color="green"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="folder" inverted color="secondary"/>
                                <q-item-main>
                                    <q-item-tile label>Movies</q-item-tile>
                                    <q-item-tile sublabel>March 1st, 2017</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="folder" inverted color="amber"/>
                                <q-item-main>
                                    <q-item-tile label>Games</q-item-tile>
                                    <q-item-tile sublabel>Latest</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item-separator inset/>
                            <q-list-header inset>Files</q-list-header>
                            <q-item>
                                <q-item-side icon="assignment" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Expenses spreadsheet</q-item-tile>
                                    <q-item-tile sublabel>March 2nd, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="place" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Places to visit</q-item-tile>
                                    <q-item-tile sublabel>February 22, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info" color="amber"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="library_music" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>My favorite song</q-item-tile>
                                    <q-item-tile sublabel>Singing it all day</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="library_music" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>My favorite song</q-item-tile>
                                    <q-item-tile sublabel>Singing it all day</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="videogame_asset" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Quasar Game</q-item-tile>
                                    <q-item-tile sublabel>Have fun while building apps</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                        </q-list>
                        <q-list class="col">
                            <q-list-header inset>Folders</q-list-header>
                            <q-item>
                                <q-item-side icon="folder" inverted color="primary"/>
                                <q-item-main>
                                    <q-item-tile label>Photos</q-item-tile>
                                    <q-item-tile sublabel>February 22, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info" color="green"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="folder" inverted color="secondary"/>
                                <q-item-main>
                                    <q-item-tile label>Movies</q-item-tile>
                                    <q-item-tile sublabel>March 1st, 2017</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="folder" inverted color="amber"/>
                                <q-item-main>
                                    <q-item-tile label>Games</q-item-tile>
                                    <q-item-tile sublabel>Latest</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item-separator inset/>
                            <q-list-header inset>Files</q-list-header>
                            <q-item>
                                <q-item-side icon="assignment" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Expenses spreadsheet</q-item-tile>
                                    <q-item-tile sublabel>March 2nd, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="place" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Places to visit</q-item-tile>
                                    <q-item-tile sublabel>February 22, 2016</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info" color="amber"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="library_music" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>My favorite song</q-item-tile>
                                    <q-item-tile sublabel>Singing it all day</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                            <q-item>
                                <q-item-side icon="videogame_asset" inverted color="grey-6"/>
                                <q-item-main>
                                    <q-item-tile label>Quasar Game</q-item-tile>
                                    <q-item-tile sublabel>Have fun while building apps</q-item-tile>
                                </q-item-main>
                                <q-item-side right icon="info"/>
                            </q-item>
                        </q-list>
                    </div>
                </q-popover>
                <q-autocomplete separator @search="search" class="text-black"/>
            </q-search>
        </div>
        <div class="page-search-result row justify-center">
            <q-card class="col-sx-12 col-md-8 bg-white q-mb-md">
                <q-card-title>
                    Cafe Basilico
                    <div slot="right" class="row items-center">
                        <q-icon name="place"/>
                        250 ft
                    </div>
                </q-card-title>
                <q-card-main>
                    <p>$・Italian, Cafe</p>
                    <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
                </q-card-main>
                <q-card-separator/>
                <q-card-actions align="end">
                    <q-btn flat color="primary" label="Show" class="float-right" @click="layoutModal=true"/>
                </q-card-actions>
            </q-card>
            <q-card class="col-sx-12 col-md-8 bg-white">
                <q-card-title>
                    Cafe Basilico
                    <div slot="right" class="row items-center">
                        <q-icon name="place"/>
                        250 ft
                    </div>
                </q-card-title>
                <q-card-main>
                    <p>$・Italian, Cafe</p>
                    <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
                </q-card-main>
                <q-card-separator/>
                <q-card-actions align="end">
                    <q-btn flat color="primary" label="Show" class="float-right" @click="layoutModal=true"/>
                </q-card-actions>
            </q-card>
        </div>
        <q-modal v-model="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
            <q-modal-layout>
                <q-toolbar slot="header">
                    <q-toolbar-title>
                        Anxiety Disorders Interview Schedule
                    </q-toolbar-title>
                    <q-btn flat icon="close" @click="closeWindow" class="float-right"/>
                </q-toolbar>
                <component :is="currentComponent" @change="changeComponent"></component>
            </q-modal-layout>
        </q-modal>
    </q-page>
</template>

<script>
    import {uid, filter} from 'quasar'
    import countries from 'assets/autocomplete.json'
    import ViewCard from '../components/card/ViewCard.vue'
    import EditCard from '../components/card/EditCard.vue'

    const icons = ['alarm', 'email', 'search', 'build', 'card_giftcard', 'perm_identity', 'receipt', 'schedule', 'speaker_phone', 'archive', 'weekend', 'battery_charging_full'];

    function getRandomIcon() {
        return icons[Math.floor(Math.random() * icons.length)]
    }

    function getRandomStamp() {
        if (Math.floor(Math.random() * 50) % 3 === 0) {
            return `${Math.floor(Math.random() * 10)} min`
        }
    }

    function getRandomSecondLabel() {
        if (Math.floor(Math.random() * 50) % 4 === 0) {
            return `UID: ${uid().substring(0, 8)}`
        }
    }

    function parseCountries() {
        return countries.map(country => {
            return {
                label: country,
                sublabel: getRandomSecondLabel(),
                icon: getRandomIcon(),
                stamp: getRandomStamp(),
                value: country
            }
        })
    }

    export default {
        name: 'PageIndex',
        data: () => {
            return {
                currentComponent: 'view-card',
                layoutModal: false,
                query: '',
            }
        },
        components: {
            ViewCard, EditCard
        },
        methods: {
            edit() {
                this.currentComponent = 'edit-card'
            },
            closeWindow() {
                this.layoutModal = false;
                this.currentComponent = 'view-card';
            },
            search(terms, done) {
                setTimeout(() => {
                    done(filter(terms, {field: 'value', list: parseCountries()}))
                }, 1000)
            },

            changeComponent(component) {
                this.currentComponent = component;
            }
        }
    }
</script>

<style lang="scss">
    .page-search-form {
        padding: 100px 0;
        position: relative;
    }

    .page-search-result {
        position: relative;
        margin-top: -50px;
    }

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