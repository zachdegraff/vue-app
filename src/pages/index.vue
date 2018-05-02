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
                    <q-btn flat icon="close" @click="layoutModal = false" class="float-right"/>
                </q-toolbar>
                <div class="row layout-padding gutter-md">
                    <div class="card-content col-xs-12 col-sm-8 col-md-9 col-lg-10">
                        <h4>Anxiety Disorders Interview Schedule</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at sagittis ligula. Aliquam nec nunc diam. Nulla gravida nibh in mi posuere, sed sollicitudin purus consequat. Donec dignissim nibh tortor. Aenean quis feugiat dolor, ac molestie lectus. Cras accumsan elit est, non dapibus nibh aliquam vel. Suspendisse pellentesque, purus sed dictum lacinia, dolor quam varius nibh, non placerat arcu quam eu metus. Mauris quis consectetur justo. Fusce interdum sodales sodales. Phasellus imperdiet sit amet dolor in malesuada. Maecenas leo velit, fringilla non egestas nec, luctus sit amet massa. Praesent a sem nec arcu fringilla mattis.</p>
                        <p>Fusce quam ex, luctus consequat quam tempor, commodo tempor augue. Sed vel justo dui. Etiam vitae scelerisque nulla, eu rhoncus arcu. Nunc ut nisl et nulla mattis scelerisque. Mauris finibus orci neque, non hendrerit libero molestie fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lobortis dignissim massa ac mollis.</p>
                        <p>Nullam a odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget facilisis ipsum. Phasellus fringilla imperdiet sollicitudin. Praesent eget feugiat sapien, eu ullamcorper nulla. Vestibulum eu blandit lacus. Integer quis sem sed ex commodo consequat sit amet vel purus. Aliquam erat volutpat. Nullam maximus varius sem ac feugiat. Proin accumsan elit eu est sodales ultrices. Curabitur fringilla massa at risus ornare lobortis mattis tincidunt elit. Cras tempor dignissim tincidunt. Phasellus turpis ex, rutrum vulputate sagittis et, pellentesque in erat. Cras sed nisl a libero mattis ultrices ornare vitae arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam non neque sed lectus ultricies imperdiet.</p>

                        <div class="q-pt-md">
                            <div class="text-bold q-pb-sm">Shorthand</div>
                            <q-chip color="primary">
                                ADIS
                            </q-chip>
                            <q-chip color="primary">
                                ADIS
                            </q-chip>
                        </div>
                        <div class="q-pt-md">
                            <div class="text-bold q-pb-sm">Resources</div>
                            <q-btn outline color="primary" label="Lecture slides #1" class="block q-mb-sm"/>
                            <q-btn outline color="primary" label="Lecture slides #2" class="block q-mb-sm"/>
                            <q-btn outline color="primary" label="Lecture slides #3" class="block q-mb-sm"/>
                        </div>
                        <div class="q-pt-md">
                            <div class="text-bold q-pb-sm">Related Concepts</div>
                            <q-btn outline color="primary" label="Lecture slides #1" class="block q-mb-sm"/>
                            <q-btn outline color="primary" label="Lecture slides #2" class="block q-mb-sm"/>
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
                            <q-btn label="edit card" color="primary" class="full-width q-mb-sm"/>
                        </div>
                        <em>Last updated on April 22 2017 by Dr Ayelet Ruscio</em>
                    </div>
                </div>
            </q-modal-layout>
        </q-modal>
    </q-page>
</template>

<script>
    import {uid, filter} from 'quasar'
    import countries from 'assets/autocomplete.json'

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
                layoutModal: false,
                query: '',
            }
        },
        methods: {
            search(terms, done) {
                setTimeout(() => {
                    done(filter(terms, {field: 'value', list: parseCountries()}))
                }, 1000)
            },
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