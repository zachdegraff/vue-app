<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <div class="row flex-center q-mt-xl">
                    <div class="auth-login col-xs-11 col-sm-6 col-md-5 col-lg-4">
                        <div class="auth-login-logo text-center q-pb-xl">
                            <a href="https://wonderus.app/"><img src="statics/auth-logo.png"/></a>
                        </div>
                        <router-view></router-view>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>
    export default {}
</script>
<style lang="scss">
    .auth-login {
        .auth-login-logo {
            img {
                max-width: 300px;
            }
        }
    }
</style>