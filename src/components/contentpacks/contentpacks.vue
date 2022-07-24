<template>
  <div class="q-mb-md">
  <div v-for="(key, i) in items" :key="`comment_${i}`" >
      <q-card flat bordered class="questions-item self-center q-mb-md bg-white">
          <q-card-section class="q-list">
            <q-item>
            <div class="row items-center no-wrap">
              <div class="col">
                <h3 class="text-h3">{{i}}</h3>
                <div class="text-subtitle2">Example terms are: {{key[0].shorthand}}, {{key[1].shorthand}}, {{key[2].shorthand}}</div>
              </div>
            </div>
            </q-item>
          </q-card-section>
          <q-card-actions>
            <q-btn flat @click="subscribeaction(i, key)" >Subscribe</q-btn>
          </q-card-actions>
      </q-card>
  </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import { ref } from 'vue'


export default {

    props: ['items'],

    computed: {
        ...mapGetters({
            isSubscribed: 'subscription/isValid'
        })
    },

    methods: {
        ...mapActions({
            subscribe: 'contentpacks/subscribe'
        }),
        subscribeaction() {
          debugger;
          this.subscribe().then((data) => {
            console.log('subscribed', data);
          })
        }
    },


}

</script>
<style lang="scss">

</style>
