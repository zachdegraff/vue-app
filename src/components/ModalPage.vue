<template>
    <transition name="modal-page">
        <div class="modal-page row flex-center">
            <div class="modal-page-overlay"></div>
            <div class="modal-page-content">
                <div class="q-layout-header">
                    <q-toolbar>
                        <q-toolbar-title>{{title}}</q-toolbar-title>
                        <q-btn flat icon="close" @click="close" class="float-right"/>
                    </q-toolbar>
                </div>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data: () => {
            return {

            }
        },
        mounted() {

        },
        methods: {
            close() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss">
    .modal-page {
        transition: all .2s ease-in-out;
    }

    .modal-page-header {
        color: #fff;
        padding: 4px 24px;
        width: 100%;
    }

    .modal-page-overlay {
        background: rgba(0, 0, 0, 0.4);
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 3000;
    }

    .modal-page-content {
        position: absolute;
        top: 50px;
        background: #fff;
        box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
        overflow-y: auto;
        margin-bottom: 100px;
        min-width: 280px;
        max-width: 80vw;
        z-index: 3001;
        -webkit-backface-visibility: hidden;
    }

    .modal-page-enter, .modal-page-leave-active {
        opacity: 0
    }

    @media (max-width: 767px) {
        .modal-page-content {
            max-width: 100vw;
        }
    }
</style>