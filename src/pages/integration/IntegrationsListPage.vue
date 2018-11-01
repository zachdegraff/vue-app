<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row q-mb-lg">
                    <div class="col q-headline">Integrations</div>
                </div>
                <slack-integration/>
                <div class="text-faded q-mt-xl">We're working on integrations to make your knowledge available in more places.
                    <a href="https://wonderus.canny.io/feature-requests" target="_blank">Request one here!</a></div>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import SlackIntegration from '../../components/integration/SlackIntegration.vue'

    export default {
        components: {
            SiteNavigation, SlackIntegration
        }
    }
</script>