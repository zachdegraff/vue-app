<template>
    <span class="badge" :class="['badge-' + variant]"><slot></slot></span>
</template>

<script>
export default {
    name: "badge",
    props: {
        variant: {
            type: String,
            default: 'success'
        }
    }
}
</script>

<style>
    .badge {
        display: inline-flex;
        align-items: center;
        padding-left: 0.625rem;
        padding-right: 0.625rem;
        margin-right: 2px;
        border-radius: 9999px;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 500;
    }

    .badge.badge-success {
        background-color: #bbf7d0;
        opacity: 1;
        color: #0c0c0c;
    }
    .badge.badge-danger {
        background-color: #fecaca;
        opacity: 1;
        color: #dc2626
    }


</style>
