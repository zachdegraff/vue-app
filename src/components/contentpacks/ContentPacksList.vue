<template>
    <div>
        <q-spinner slot="message" :size="40" color="red" v-show="showSlider" class="custom-spinner"/>
        <div class="q-mb-md">
          <div v-for="contentPack in items">
            <q-card flat bordered class="questions-item self-center q-mb-md bg-white">
              <q-list>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>{{contentPack.name}}</q-item-tile>
                    <q-item-tile
                        sublabel>This content-pack has {{contentPack.items}} items.
                        Click <router-link class="view-items" :to="`/content-packs/${contentPack.id}/items`"> here </router-link> to view.
                    </q-item-tile>
                  </q-item-main>
                  <q-item-side class="subscriptions-actions justify-end">
                    <div class="toggle">
                      <input type="checkbox" :checked="contentPack.subscribed" id="temp">
                      <label class="toggle-label" v-if="!contentPack.subscribed" @click="subscribe(contentPack, team)" >Unsubscribed</label>
                      <label class="toggle-label" v-if="contentPack.subscribed" @click="unsubscribe(contentPack, team)" >Subscribed</label>
                    </div>
                  </q-item-side>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import ViewItems from "./ContentPackItemsList";

export default {

    props: ['items', 'team', 'subscriptions', 'filter'],
    data: () => {
        return { contentPack: null, showSlider: false }
    },
    computed: {
        ...mapGetters({
            isSubscribed: 'subscription/isValid'
        })
    },
    components: {
        ViewItems
    },
    methods: {
        ...mapActions({
            subscribeAction: 'contentpacks/subscribe',
            unsubscribeAction: 'contentpacks/unsubscribe',
            loadContentPacksAction: 'contentpacks/loadContentPacks',
        }),
        subscribe(contentPack, team) {
          this.showSlider = true;
          this.subscribeAction({contentPack: contentPack, team:team}).then((data) => {
            this.showSlider = false;
            contentPack.subscribed = true;
          })
        },
        unsubscribe(contentPack, team) {
          this.unsubscribeAction({id:contentPack.id, team:team}).then((data) => {
            contentPack.subscribed = false;
          })
        },
    },
}

</script>
<style lang="scss">
.content-packs {
  .view-items {
      cursor: pointer;
  }
  .custom-spinner {
    position: absolute;
    width: 10%;
    left: 40%;
  }
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
