<template>
    <q-layout>
        <q-layout-header>
            <q-toolbar color="primary">
                <q-toolbar-title>
                    EAST BAY MECH
                </q-toolbar-title>
                <q-toolbar-title>
                    Wonderus
                </q-toolbar-title>
                <q-btn color="white" class="text-black">
                    <q-icon name="add"/>
                    Add Card
                </q-btn>
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
    export default {

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
</style>
