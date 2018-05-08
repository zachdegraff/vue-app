<template>
    <q-layout-header>
        <q-toolbar color="primary">
            <img src="~assets/company.png" class="header-icon round-borders vertical-middle"/>
            <q-toolbar-title class="gt-xs">EAST BAY MECH</q-toolbar-title>
            <q-toolbar-title class="app-logo">
                Wonderus
            </q-toolbar-title>
            <q-btn color="white" class="text-black gt-xs" icon="add" label="Add Card" @click="create"/>
            <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" @click="create"/>
            <div class="auth-user q-ml-md">
                <img src="~assets/profile.jpg" class="header-icon round-borders vertical-middle"/>
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
</template>
<script>
    export default {
        methods: {
            create() {
                this.$router.push({name: 'create_card'})
            }
        }
    }
</script>

<style lang="scss">
    .header-icon {
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