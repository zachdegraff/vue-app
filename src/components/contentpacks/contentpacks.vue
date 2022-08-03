<template>
  <div class="q-mb-md">
  <div v-for="(key, i) in items" :key="`comment_${i}`" >
      <q-card flat bordered class="questions-item self-center q-mb-md bg-white">
              <q-card-section v-if="filter && subscriptions[i]" class="q-list">
                <q-item>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <h3 class="text-h3">{{i}}</h3>
                    <div class="text-subtitle2">Example terms are: {{key[0].shorthand}}, {{key[1].shorthand}}, {{key[2].shorthand}}</div>
                  </div>
                </div>
                </q-item>
                <q-card-actions class="subscriptions-actions justify-end">
                  <div class="toggle">
                      <input type="checkbox" :checked="subscriptions[i]" id="temp">
                      <label class="toggle-label" v-if="!subscriptions[i]" flat @click="subscribeaction(i, key)" >Unsubscribed</label>
                      <label class="toggle-label" v-if="subscriptions[i]" flat @click="unsubscribeaction(i, key)" >Subscribed</label>
                  </div>
                </q-card-actions>
              </q-card-section>
            <q-card-section v-if="!filter" class="q-list">
              <q-item>
              <div class="row items-center no-wrap">
                <div class="col">
                  <h3 class="text-h3">{{i}}</h3>
                  <div class="text-subtitle2">Example terms are: {{key[0].shorthand}}, {{key[1].shorthand}}, {{key[2].shorthand}}</div>
                </div>
              </div>
              </q-item>
              <q-card-actions class="subscriptions-actions justify-end">
                <div class="toggle">
                    <input type="checkbox" :checked="subscriptions[i]" id="temp">
                    <label class="toggle-label" v-if="!subscriptions[i]" flat @click="subscribeaction(i, key)" >Unsubscribed</label>
                    <label class="toggle-label" v-if="subscriptions[i]" flat @click="unsubscribeaction(i, key)" >Subscribed</label>
                </div>
              </q-card-actions>
            </q-card-section>
      </q-card>
  </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import { ref } from 'vue'


export default {

    props: ['items', 'team', 'subscriptions', 'filter'],

    computed: {
        ...mapGetters({
            isSubscribed: 'subscription/isValid'
        })
    },

    methods: {
        ...mapActions({
            subscribe: 'contentpacks/subscribe',
            unsubscribe: 'contentpacks/unsubscribe',
            loadSubscribedContentPacks: 'contentpacks/loadSubscribedContentPacks'
        }),
        subscribeaction(theme) {
          var data = {teamId: this.team.id, contentpackId: theme}
          this.subscribe(data).then((data) => {
            this.loadSubscribedContentPacks().then((data) => {
                done(true);
            })
          })
        },
        unsubscribeaction(theme) {
          var data = {teamId: this.team.id, contentpackId: theme}
          this.unsubscribe(data).then((data) => {
            this.loadSubscribedContentPacks().then((data) => {
                done(true);
            })
          })
        }
    },
}

</script>
<style lang="scss">
.content-packs {
  .toggle {
    input[type="checkbox"]{
      display: none;
      transition: all 0.3s ease-in;
    }

    label{
      position: relative;
      transition: all 0.3s ease-in;
    }

    input[type="checkbox"]:checked  + label::before{
      background: #2fab65;
    }
    input[type="checkbox"] + label::before{
      content: ' ';
      display: block;
      height: 10px;
      width: 45px;
      border: 1px solid #2fab65;
      border-radius: 9px;
      position: absolute;
      top: 6px;
      left: -65px;
      background: #000;
      transition: all 0.3s ease-in;
    }

    input[type="checkbox"] + label::after{
      content: ' ';
      display: block;
      height: 20px;
      width: 20px;
      border: 1px solid white;
      border-radius: 50%;
      position: absolute;
      top: 0px;
      left: -68px;
      background: #2fab65;
      transition: all 0.3s ease-in;
    }

    input[type="checkbox"]:checked + label::after{
      left: -40px;
      transition: all 0.3s ease-in;
    }
    .toggle-label {
      width: 100px;
      display: inline-block;
    }
  }
}
</style>
