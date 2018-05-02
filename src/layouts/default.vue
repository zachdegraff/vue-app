<template>
    <q-layout>
        <q-layout-header>
            <q-toolbar color="primary">
                <img src="~assets/company.png" class="auth-user-image round-borders vertical-middle"/>
                <q-toolbar-title class="gt-xs">EAST BAY MECH</q-toolbar-title>
                <q-toolbar-title class="app-logo">
                    Wonderus
                </q-toolbar-title>
                <q-btn color="white" class="text-black gt-xs" icon="add" label="Add Card"/>
                <q-btn color="white" class="short-add-button text-black lt-sm" icon="add"/>
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
    </q-layout>
</template>

<script>
    export default {}
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
