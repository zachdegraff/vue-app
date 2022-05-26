<template>
    <div class="wrapper">
        <div class="actions" v-if="!opened">
            <q-btn outline no-caps color="primary" label="Import" class="full-width q-mb-md" @click="opened = true" />
            <a href="/statics/files/import-cards.example.csv">File example</a>
        </div>

        <div class="import" v-if="opened">
            <q-uploader with-credentials extensions=".csv" :url="uploadUrl" :upload-factory="uploadFactory"
                :additional-fields="fields" @uploaded="uploaded" @fail="failed" />
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import axios from 'axios'
import { update } from '../../api/methods/cards';
import { error } from '../../helpers'

const { mapGetters } = createNamespacedHelpers('teams');
const { mapActions } = createNamespacedHelpers('cards');

export default {
    data() {
        return {
            opened: false,
            uploadUrl: process.env.API_HOST + '/cards/import'
        }
    },
    computed: {
        ...mapGetters(['current']),
        fields() {
            return [
                {
                    name: 'teamId',
                    value: this.current.id
                }
            ]
        }
    },
    methods: {
        ...mapActions(['importCard']),
        uploadFactory(file, updateProgress) {
            const data = new FormData();
            data.append('teamId', this.current.id);
            data.append('file', file);

            const config = {
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    updateProgress(percentCompleted);
                }
            };

            return this.importCard({data, config})
                .then(function (res) {
                    return res.data;
                })
                .catch(function (err) {
                    return err;
                });
        },
        uploaded(file, xhr) {
            this.opened = false;
        },
        failed(file, xhr) {
            error('Upload has fail');
        }
    }
}
</script>

<style lang="scss">
.import {
    position: relative;
}
</style>
