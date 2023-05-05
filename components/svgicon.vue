<template>
    <div class="svg" @click="$emit('click')" v-html="require(`~/assets/icons/${name}.svg?raw`)"></div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default() {
                return "time"
            }
        }
    }
}
</script>

<style lang="scss">
.svg {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>