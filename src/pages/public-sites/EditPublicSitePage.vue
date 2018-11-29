<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row q-mb-lg">
                    <div class="col q-headline">Public Site</div>
                    <div class="q-mt-md">A Public Site will make all or some of your team's knowledge cards publicly available on the web at a unique URL. Public sites are great if you are not sharing any confidential information. Otherwise, you can invite team members to your Wonderus team.</div>
                </div>
                <div class="q-mt-md" v-if="isPublished">
                    Your site is currently published at
                    <a :href="siteUrl" target="_blank">{{siteUrl}}</a>
                </div>
                <div class="row q-mt-lg gutter-md">
                    <q-field class="col-xs-12 col-sm-10">
                        <q-input v-model="form.name" float-label="Site name"/>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10">
                        <q-color v-model="form.primaryColor" float-label="Primary Color"/>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10">
                        <q-color v-model="form.accentColor" float-label="Accent Color"/>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10">
                        <q-color v-model="form.linkColor" float-label="Link Color"/>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10">
                        <q-chips-input v-model="featuredCards" float-label="Featured cards">
                            <q-autocomplete @search="searchCards" @selected="(item) => setItem(item, 'featuredCards')"/>
                        </q-chips-input>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10">
                        <q-chips-input v-model="includedTags" float-label="Tags to include">
                            <q-autocomplete :static-data="{field: 'value', list: options}" @selected="(item) => setItem(item, 'includedTags')"/>
                        </q-chips-input>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10">
                        <q-chips-input v-model="excludedTags" float-label="Tags to exclude">
                            <q-autocomplete :static-data="{field: 'value', list: options}" @selected="(item) => setItem(item, 'excludedTags')"/>
                        </q-chips-input>
                    </q-field>
                    <q-field class="col-xs-12 col-sm-10" label="Site background image" label-width="12">
                        <image-chooser :path="background" @change="changeFile"></image-chooser>
                    </q-field>
                    <div class="col-xs-12 col-sm-10">
                        <q-btn label="Save and Publish Public Site" color="primary" @click="publish" v-show="!isPublished"/>
                        <q-btn label="Save Changes" color="primary" @click="submit" v-show="isPublished"/>
                        <q-btn label="Unpublish Site" @click="unpublish" v-show="isPublished"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import ImageChooser from '../../components/ImageChooser'
    import {mapGetters, mapActions} from 'vuex'

    const APP_HOST = process.env.APP_HOST;

    export default {
        data: () => {
            return {
                form: {
                    id: null,
                    name: '',
                    background: null,
                    linkColor: '',
                    primaryColor: '',
                    accentColor: '',
                    isActive: 1,
                    featuredCards: [],
                    includedTags: [],
                    excludedTags: [],
                    flushBackground: false
                },
                background: null,
                featuredCards: [],
                includedTags: [],
                excludedTags: []
            }
        },
        created() {
            if (this.team && !this.site) this.loadSites();
            if (this.tags.length === 0) this.loadTags();

            if (this.site) {
                this.init(this.site)
            }
        },
        watch: {
            team: function (val) {
                if (val) this.loadSites()
            },
            site: function (val) {
                if (!val) return;

                this.init(val)
            },
            featuredCards: function (val, old) {
                if (val.length < old.length) this.toggleItems(val, 'featuredCards')
            },
            includedTags: function (val, old) {
                if (val.length < old.length) this.toggleItems(val, 'includedTags')
            },
            excludedTags: function (val, old) {
                if (val.length < old.length) this.toggleItems(val, 'excludedTags')
            },
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                tags: 'tags/allNonEmpty',
                sites: 'publicSites/getTeamSites'
            }),
            site() {
                return this.sites[0] || null
            },
            siteUrl() {
                if (!this.site) return '';

                return `${APP_HOST}/for/${this.site.slug}`
            },
            options() {
                return this.tags.map(tag => {
                    return {id: tag.id, name: tag.name, label: tag.name, value: tag.name}
                })
            },
            isPublished() {
                return this.form.isActive === 1 && this.form.id !== null
            }
        },
        components: {
            SiteNavigation, ImageChooser
        },
        methods: {
            ...mapActions({
                hints: 'search/cardsHints',
                store: 'publicSites/store',
                loadTags: 'tags/all',
                loadSites: 'publicSites/loadTeamSites',
                loadSiteConfig: 'publicSites/loadSiteConfig'
            }),
            submit() {
                const data = this.prepare();
                return this.store(data).then(() => this.loadSites())
            },
            publish() {
                this.form.isActive = 1;
                this.submit()
            },
            unpublish() {
                this.form.isActive = 0;
                this.submit()
            },
            init(site) {
                this.background = site.background;

                this.loadSiteConfig(site.id).then(config => {
                    ['featuredCards', 'includedTags', 'excludedTags'].forEach(key => {
                        this.form[key] = config[key];
                        this[key] = config[key].map(item => item.name);
                    })
                });

                ['id', 'name', 'linkColor', 'primaryColor', 'accentColor', 'isActive'].forEach(key => this.form[key] = site[key])
            },
            prepare() {
                const data = new FormData();
                for (let i in this.form) {
                    if (Array.isArray(this.form[i])) {
                        if (this.form[i].length > 0) {
                            this.form[i].forEach(item => data.append(i + '[]', item.id))
                        }
                        continue
                    }
                    data.append(i, this.form[i])
                }
                return data
            },
            changeFile(file) {
                this.form.background = file;
                this.form.flushBackground = file === null;
            },
            setItem(item, target) {
                const idx = this.form[target].findIndex(i => i.id === item.id);

                if (idx === -1) this.form[target].push(item)
            },
            toggleItems(value, source) {
                this.form[source] = this.form[source].filter(item => value.includes(item.name))
            },
            searchCards(terms, done) {
                this.hints({terms}).then(items => {
                    const result = items.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            label: item.name,
                            value: item.name
                        };
                    });
                    done(result);
                }).catch(() => done([]));
            }
        }
    }
</script>