// Configuration for your app

module.exports = function (ctx) {
    return {
        // app plugins (/src/plugins)
        plugins: [
            'axios', 'vuelidate'
        ],
        css: [
            'app.styl'
        ],
        extras: [
            ctx.theme.mat ? 'roboto-font' : null,
            'material-icons'
            // 'ionicons',
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: false,
        vendor: {
            add: [],
            remove: []
        },
        build: {
            scopeHoisting: true,
            vueCompiler: true,
            vueRouterMode: 'history',
            publicPath: '/',
            env: ctx.dev
                ? {
                    API_HOST: JSON.stringify('http://wonderus'),
                    APP_HOST: JSON.stringify('http://localhost:8080'),
                    SLACK_CLIENT_ID: JSON.stringify('371875442850.371336699377')
                } : {
                    API_HOST: JSON.stringify('https://api.wonderus.app'),
                    APP_HOST: JSON.stringify('https://i.wonderus.app'),
                    SLACK_CLIENT_ID: JSON.stringify('372369379348.372595746706')
                },
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            // useNotifier: false,
            extendWebpack(cfg) {
            }
        },
        devServer: {
            // https: true,
            // port: 8080,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                'QAjaxBar',
                'QLayout',
                'QLayoutHeader',
                'QLayoutFooter',
                'QLayoutDrawer',
                'QPageContainer',
                'QPage',
                'QToolbar',
                'QToolbarTitle',
                'QBtnDropdown',
                'QBtn',
                'QIcon',
                'QChip',
                'QField',
                'QEditor',
                'QInput',
                'QSelect',
                'QChipsInput',
                'QCheckbox',
                'QList',
                'QListHeader',
                'QPopover',
                'QItem',
                'QItemMain',
                'QItemSide',
                'QItemTile',
                'QItemSeparator',
                'QSearch',
                'QAutocomplete',
                'QCard',
                'QCardTitle',
                'QCardMain',
                'QCardMedia',
                'QCardSeparator',
                'QCardActions',
                'QModal',
                'QModalLayout',
                'QSpinner',
                'QSpinnerCircles',
                'QTable',
                'QTh',
                'QTr',
                'QTd',
                'QTableColumns',
                'QTooltip',
            ],
            directives: [
                'Ripple', 'CloseOverlay'
            ],
            // Quasar plugins
            plugins: [
                'Notify', 'Dialog'
            ]
        },
        // animations: 'all' --- includes all animations
        animations: [],
        pwa: {
            cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [
                    {
                        'src': 'statics/icons/icon-128x128.png',
                        'sizes': '128x128',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-192x192.png',
                        'sizes': '192x192',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-256x256.png',
                        'sizes': '256x256',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-384x384.png',
                        'sizes': '384x384',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-512x512.png',
                        'sizes': '512x512',
                        'type': 'image/png'
                    }
                ]
            }
        },
        cordova: {
            // id: 'org.cordova.quasar.app'
        },
        electron: {
            extendWebpack(cfg) {
                // do something with cfg
            },
            packager: {
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Window only
                // win32metadata: { ... }
            }
        },

        // leave this here for Quasar CLI
        starterKit: '1.0.2'
    }
}
