<template>
    <modal-page title="View card">
        <div class="row layout-padding gutter-md">
            <div class="card-content col-xs-12 col-sm-8 col-md-9 col-lg-10">
                <h4>Anxiety Disorders Interview Schedule</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at sagittis ligula. Aliquam nec nunc diam. Nulla gravida nibh in mi posuere, sed sollicitudin purus consequat. Donec dignissim nibh tortor. Aenean quis feugiat dolor, ac molestie lectus. Cras accumsan elit est, non dapibus nibh aliquam vel. Suspendisse pellentesque, purus sed dictum lacinia, dolor quam varius nibh, non placerat arcu quam eu metus. Mauris quis consectetur justo. Fusce interdum sodales sodales. Phasellus imperdiet sit amet dolor in malesuada. Maecenas leo velit, fringilla non egestas nec, luctus sit amet massa. Praesent a sem nec arcu fringilla mattis.</p>
                <p>Fusce quam ex, luctus consequat quam tempor, commodo tempor augue. Sed vel justo dui. Etiam vitae scelerisque nulla, eu rhoncus arcu. Nunc ut nisl et nulla mattis scelerisque. Mauris finibus orci neque, non hendrerit libero molestie fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lobortis dignissim massa ac mollis.</p>
                <p>Nullam a odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget facilisis ipsum. Phasellus fringilla imperdiet sollicitudin. Praesent eget feugiat sapien, eu ullamcorper nulla. Vestibulum eu blandit lacus. Integer quis sem sed ex commodo consequat sit amet vel purus. Aliquam erat volutpat. Nullam maximus varius sem ac feugiat. Proin accumsan elit eu est sodales ultrices. Curabitur fringilla massa at risus ornare lobortis mattis tincidunt elit. Cras tempor dignissim tincidunt. Phasellus turpis ex, rutrum vulputate sagittis et, pellentesque in erat. Cras sed nisl a libero mattis ultrices ornare vitae arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam non neque sed lectus ultricies imperdiet.</p>

                <div class="q-pt-md">
                    <div class="text-bold q-pb-sm">Shorthand</div>
                    <q-chip color="primary">
                        ADIS
                    </q-chip>
                    <q-chip color="primary">
                        ADIS
                    </q-chip>
                </div>
                <div class="q-pt-md">
                    <div class="text-bold q-pb-sm">Resources</div>
                    <q-btn outline color="primary" label="Lecture slides #1" class="block q-mb-sm"/>
                    <q-btn outline color="primary" label="Lecture slides #2" class="block q-mb-sm"/>
                    <q-btn outline color="primary" label="Lecture slides #3" class="block q-mb-sm"/>
                </div>
                <div class="q-pt-md">
                    <div class="text-bold q-pb-sm">Related Concepts</div>
                    <q-btn outline color="primary" label="Lecture slides #1" class="block q-mb-sm"/>
                    <q-btn outline color="primary" label="Lecture slides #2" class="block q-mb-sm"/>
                </div>
                <div class="card-mobile-actions lt-sm">
                    <q-icon name="menu"/>
                    <q-popover>
                        <q-list separator link>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile class="uppercase">ask the team</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile class="uppercase">save</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile class="uppercase">edit card</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-popover>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                <div class="q-mb-md gt-xs">
                    <div class="q-mb-md text-bold">Actions</div>
                    <q-btn label="ask the team" color="primary" class="full-width q-mb-sm"/>
                    <q-btn label="save" color="primary" class="full-width q-mb-sm"/>
                    <q-btn label="edit card" color="primary" class="full-width q-mb-sm" @click="$emit('change', 'edit-card')"/>
                </div>
                <em>Last updated on April 22 2017 by Dr Ayelet Ruscio</em>
            </div>
        </div>
    </modal-page>
</template>
<script>
    import ModalPage from '../../components/ModalPage.vue'

    export default {
        components: {
            ModalPage
        }
    }
</script>