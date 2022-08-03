<template>
  <div class="q-mb-md">
  <div v-for="(key, i) in items" :key="`comment_${i}`" >
      <q-card flat bordered class="questions-item self-center q-mb-md bg-white">
          <q-card-section class="q-list">
            <q-item>
            <div class="row items-center no-wrap">
              <div class="col">
                <h3 class="text-h3">asfdsf{{i}}</h3>
                <div class="text-subtitle2">Example terms are: {{key[0].shorthand}}, {{key[1].shorthand}}, {{key[2].shorthand}}</div>
              </div>
            </div>
            </q-item>
          </q-card-section>
          <q-card-actions>
            <q-btn v-if="!subscriptions[i]" flat @click="subscribeaction(i, key)" >Subscribe</q-btn>
            <q-btn v-if="subscriptions[i]" flat @click="unsubscribeaction(i, key)" >Unsubscribe</q-btn>
          </q-card-actions>
      </q-card>
  </div>
  </div>
</template>
<script>





</script>
<style lang="scss">

</style>
