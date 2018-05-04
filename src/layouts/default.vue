<template>
    <q-layout>
        <q-layout-header>
            <q-toolbar color="primary">
                <img src="~assets/company.png" class="auth-user-image round-borders vertical-middle"/>
                <q-toolbar-title class="gt-xs">EAST BAY MECH</q-toolbar-title>
                <q-toolbar-title class="app-logo">
                    Wonderus
                </q-toolbar-title>
                <q-btn color="white" class="text-black gt-xs" icon="add" label="Add Card" @click="createCardModal=true"/>
                <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" @click="createCardModal=true"/>
                <div class="auth-user q-ml-md">
                    <img src="~assets/profile.jpg" class="auth-user-image round-borders vertical-middle"/>
                    <q-popover>
                        <q-list separator link>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile>My Profile</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile>Logout</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-popover>
                </div>
            </q-toolbar>
        </q-layout-header>

        <q-page-container>
            <router-view/>
        </q-page-container>

        <q-layout-footer>

        </q-layout-footer>
        <q-modal v-model="createCardModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
            <q-modal-layout>
                <q-toolbar slot="header">
                    <q-toolbar-title>
                        Create a new card
                    </q-toolbar-title>
                    <q-btn flat icon="close" @click="createCardModal=false" class="float-right"/>
                </q-toolbar>
                <create-card @saved="createCardModal=false"></create-card>
            </q-modal-layout>
        </q-modal>
    </q-layout>
</template>

<script>
    import CreateCard from '../components/card/CreateCard.vue'

    export default {
        data: () => {
            return {
                createCardModal: false,
            }
        },
        components: {CreateCard}
    }
</script>

<style lang="scss">
    .auth-user-menu {
        position: absolute;
        right: 0;
        top: 30px;
    }

    .auth-user-image {
        cursor: pointer;
        width: 35px;
    }

    .short-add-button {
        padding: 4px 10px;
    }

    @media all and (max-width: 576px) {
        .app-logo {
            text-align: center;
        }
    }

</style>
