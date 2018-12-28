<template>
    <div>
        <div class="q-headline">Plans</div>
        <div class="q-mt-lg" v-if="isSubscriptionLoading">
            <q-spinner :size="50" color="red"></q-spinner>
        </div>
        <div class="team-plan-info" v-if="!isSubscriptionLoading && subscription">
            <div class="q-mt-lg">
                <strong>Subscription:</strong> {{subscription.name}}
                <div v-if="subscription.isFree"><strong>Trial Days Remaining:</strong> {{subscription.trialDaysRemaining}} days</div>
                <div v-if="subscription.price && team.coupon && team.coupon.isRegular"><strong>Discount:</strong> {{team.coupon.percentOff}}% ({{team.coupon.name}})</div>
                <div v-if="subscription.price"><strong>Cost:</strong> ${{subscription.price}}/{{subscription.interval}}</div>
                <div v-if="subscription.nextBillingDate"><strong>Next Billing Date:</strong> {{toLocaleDateString(subscription.nextBillingDate)}}</div>
                <div v-if="!subscription.isFree && team.email"><strong>Invoices Sent To:</strong> {{team.email}}
                    <q-popover v-model="isEmailPopoverOpen" class="q-pa-sm" style="width: 400px">
                        <q-input v-model="email" @blur="updateEmailAddress" float-label="Email address"/>
                    </q-popover>
                    <q-btn flat no-caps dense size="md" color="primary" label="Change" class="team-plan-change-btn" @click="isEmailPopoverOpen=true" v-show="!isInvoiceEmailChanging"/>
                </div>
                <div v-if="team && team.cardBrand">
                    <strong>Payment Method:</strong> {{team.cardBrand}} ending in *{{team.cardLastFour}}
                    <q-btn flat no-caps dense size="md" color="primary" label="Change Payment Method" class="team-plan-change-btn" @click="$refs.method.open()" v-show="!isPaymentMethodChanging"/>
                    <vue-stripe-checkout
                            ref="method"
                            name="Wonderus"
                            image="statics/stripe.png"
                            label="Update Card Details"
                            panelLabel="Update Card Details"
                            :allow-remember-me="false"
                            @done="updatePaymentMethod"
                    ></vue-stripe-checkout>
                </div>
            </div>
            <div class="q-mt-lg">
                <strong>Total Team Members:</strong> {{(subscription.managers + subscription.viewers)}}<br/>
                <em>Admins & Contributors: </em> {{subscription.managers}}
                <span v-show="subscription.limitManagers > 0">/ {{subscription.limitManagers}}</span><br/>
                <em>Viewers:</em> {{subscription.viewers}}
                <span v-show="subscription.limitViewers > 0">/ {{subscription.limitViewers}}</span>
            </div>
            <div class="q-mt-lg">
                <strong>Total Knowledge Cards:</strong> {{subscription.cards}}
                <span v-show="subscription.limitCards > 0">/ {{subscription.limitCards}}</span>
            </div>
            <div class="q-mt-lg" v-if="canSubscribe && team.coupon">
                <strong>Discount:</strong> {{team.coupon.percentOff}}% ({{team.coupon.name}})
            </div>
            <div class="q-mt-lg" v-show="isSubscriptionCreating">
                <q-spinner :size="50" color="red"></q-spinner>
            </div>
            <div class="q-mt-lg" v-if="canSubscribe">
                <strong>Cost to Subscribe:</strong> ${{price}}/{{plan.interval}} ({{plan.name}})
                <div class="q-mt-lg">
                    <q-btn no-caps color="primary" label="Subscribe Now" @click="$refs.subscription.open()"/>
                </div>
                <vue-stripe-checkout
                        ref="subscription"
                        image="statics/stripe.png"
                        :name="plan.name"
                        currency="USD"
                        :amount="stripeAmount"
                        :allow-remember-me="false"
                        @done="createSubscription"
                ></vue-stripe-checkout>
            </div>

            <div class="q-mt-lg" v-show="subscription && !subscription.isFree">To cancel or make changes to your plan, please contact <a href="mailto:hello@wonderus.app">hello@wonderus.app</a></div>
        </div>
    </div>
</template>
<script>
    import DateFormatter from '../../mixins/DateFormatter'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        props: ['id'],
        data: () => {
            return {
                email: '',
                subscription: null,
                isEmailPopoverOpen: false
            }
        },
        mixins: [DateFormatter],
        computed: {
            ...mapGetters({
                plans: 'plans/all',
                getTeam: 'teams/getById',
                isSubscriptionLoading: 'subscription/isSubscriptionLoading',
                isSubscriptionCreating: 'subscription/isSubscriptionCreating',
                isInvoiceEmailChanging: 'subscription/isInvoiceEmailChanging',
                isPaymentMethodChanging: 'subscription/isPaymentMethodChanging'
            }),
            plan() {
                if (this.plans.length === 0 || !this.subscription) return;
                for (let i in this.plans) {
                    const plan = this.plans[i];
                    if (this.subscription.managers > plan.managers) {
                        continue
                    }
                    if (this.subscription.viewers > plan.viewers) {
                        continue
                    }
                    return plan
                }
                const maxPrice = Math.max(...this.plans.map(p => p.price));
                return this.plans.find(plan => plan.price === maxPrice);
            },
            price() {
                if (!this.plan) return null;

                let price = parseFloat(this.plan.price);
                if (this.team.coupon) {
                    price -= (parseInt(this.team.coupon.percentOff) * price / 100)
                }
                return price
            },
            team() {
                return this.getTeam(this.id)
            },
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            },
            canSubscribe() {
                if (!this.plan || !this.isOwner) return false;

                if (this.subscription) {
                    if (this.subscription.isFree) {
                        return !this.isSubscriptionCreating;
                    }
                    return false
                }
                return !this.isSubscriptionCreating;
            },
            stripeAmount() {
                if (!this.price) return false;

                return this.price * 100
            }
        },
        watch: {
            team: function (val) {
                if (val) {
                    this.email = this.team.email
                }
            }
        },
        created() {
            this.email = this.team ? this.team.email : null;
            this.loadSubscription(this.id).then(subscription => this.subscription = subscription)
        },
        methods: {
            ...mapActions({
                subscribe: 'subscription/create',
                loadSubscription: 'subscription/load',
                changeInvoiceEmail: 'subscription/changeInvoiceEmail',
                changePaymentMethod: 'subscription/changePaymentMethod'
            }),
            createSubscription({token}) {
                const params = {
                    token: token.id,
                    id: this.team.id,
                    planId: this.plan.id
                };
                this.subscribe(params).then(subscription => this.subscription = subscription)
            },
            updatePaymentMethod({token}) {
                if (this.email.trim() === '') return;

                const params = {
                    token: token.id,
                    id: this.id
                };
                this.changePaymentMethod(params)
            },
            updateEmailAddress() {
                if (this.email.trim() === '') return;

                const params = {
                    id: this.id,
                    email: this.email
                };
                this.changeInvoiceEmail(params)
            }
        }
    }
</script>
<style>
    .team-plan-info {
        line-height: 1.3;
    }

    .team-plan-change-btn {
        padding: 0 5px;
        min-height: 1em;
    }
</style>