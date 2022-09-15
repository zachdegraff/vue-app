<template>
    <div class="q-mb-md">
        <div v-for="item in items" class="q-mb-md">
            <q-card class="self-center q-mb-md bg-white">
                <q-list no-border>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label><strong>{{item.shorthand}}</strong></q-item-tile>
                            <q-item-tile>
                                {{item.name}}
                            </q-item-tile>
                            <q-item-tile sublabel>{{item.description}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                </q-list>
            </q-card>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {

    props: ['items'],

    computed: {
        ...mapGetters({
            isProcessing: 'contentpacks/isLoadingItems',
        })
    }
}
</script>
