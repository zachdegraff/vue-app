<template>
    <div class="page-search-result row justify-center">
        <q-card class="col-sx-12 col-md-8 bg-white q-mb-md">
            <q-card-title>
                Cafe Basilico
                <div slot="right" class="row items-center">
                    <q-icon name="place"/>
                    250 ft
                </div>
            </q-card-title>
            <q-card-main>
                <p>$・Italian, Cafe</p>
                <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
            </q-card-main>
            <q-card-separator/>
            <q-card-actions align="end">
                <q-btn flat color="primary" label="Show" class="float-right" @click="layoutModal=true"/>
            </q-card-actions>
        </q-card>
        <q-card class="col-sx-12 col-md-8 bg-white">
            <q-card-title>
                Cafe Basilico
                <div slot="right" class="row items-center">
                    <q-icon name="place"/>
                    250 ft
                </div>
            </q-card-title>
            <q-card-main>
                <p>$・Italian, Cafe</p>
                <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
            </q-card-main>
            <q-card-separator/>
            <q-card-actions align="end">
                <q-btn flat color="primary" label="Show" class="float-right" @click="layoutModal=true"/>
            </q-card-actions>
        </q-card>
    </div>
</template>

<style lang="scss">
    .page-search-result {
        position: relative;
        margin-top: -50px;
    }

    .card-content {
        position: relative;
    }

    .card-mobile-actions {
        position: absolute;
        font-size: 1.5em;
        right: 10px;
        top: 20px;
        width: 150px;
        text-align: right;
    }
</style>