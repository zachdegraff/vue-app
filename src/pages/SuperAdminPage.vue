<template>
    <div class="content-container">
        <div class="row gutter-x-lg" v-if="isSuperAdmin">
            <div class="col-xs-4">
                <all-teams-navigation/>
            </div>
            <div class="col-xs-8"></div>
        </div>
        <div class="fixed-center text-center" v-if="isGuest">
            <p>
                <img src="~assets/sad.svg" style="width:30vw;max-width:150px;">
            </p>
            <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
            <q-btn color="secondary" style="width:200px;" @click="$router.push('/')">Go back</q-btn>
        </div>
    </div>
</template>

<script>
    import AllTeamsNavigation from '../components/super-admin/AllTeamsNavigation.vue'
    import {mapGetters} from 'vuex'

    export default {
        created() {
            document.title = 'Wonderus'
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            }),
            isGuest() {
                if (!this.user) {
                    return true;
                }
                return !this.user.isSuperAdmin
            },
            isSuperAdmin() {
                if (!this.user) {
                    return false;
                }
                return this.user.isSuperAdmin
            }
        },
        components: {
            AllTeamsNavigation
        }
    }
</script>
<style lang="scss">
    .feed-item-avatar {
        border-radius: 50%;
        vertical-align: middle;
        width: 40px;
    }
</style>