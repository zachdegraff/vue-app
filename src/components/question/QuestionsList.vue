<template>
    <div>
        <q-card
                v-for="item in items"
                :key="item.id"
                class="questions-item self-center q-mb-md">
            <q-list no-border>
                <q-item>
                    <q-item-side icon="folder" inverted color="primary"/>
                    <q-item-main>
                        <q-item-tile label>{{item.user.fullName}}</q-item-tile>
                        <q-item-tile sublabel>Asked at 3:45pm, June 16 2018</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item>
                    <q-item-main>{{item.content}}</q-item-main>
                </q-item>
            </q-list>
            <q-card-actions align="between">
                <q-btn flat icon="keyboard_arrow_down" label="2 replies" no-caps @click="toggleComments(item)"/>
                <q-btn flat icon="reply" label="Reply" no-caps/>
            </q-card-actions>
            <div class="questions-item-comments" v-if="item.comments.length > 0" v-show="item.showComments">
                <div
                        v-for="comment in item.comments"
                        :key="comment.id"
                        class="questions-item-comments-item">
                    <q-list no-border>
                        <q-item>
                            <q-item-side icon="folder" inverted color="primary"/>
                            <q-item-main>
                                <q-item-tile label>{{comment.user.fullName}}</q-item-tile>
                                <q-item-tile sublabel>Asked at 3:45pm, June 16 2018</q-item-tile>
                            </q-item-main>
                        </q-item>
                        <q-item>
                            <q-item-main>{{comment.content}}</q-item-main>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </q-card>
    </div>
</template>
<script>
    export default {
        props: ['items'],
        methods: {
            toggleComments(item) {
                item = {...item, showComments: !item.showComments}
            }
        }
    }
</script>