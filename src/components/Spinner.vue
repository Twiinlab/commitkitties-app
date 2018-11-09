<template>
  <div>
    <div class="spinner" v-if="!condition">
      <img src="" alt="">
        <img src="@/assets/images/loader.gif" alt="logo">
        <!-- <half-circle-spinner
        :animation-duration="config['animation-duration']"
        :size="config.size"
        :color="config.color"
        /> -->
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>

export default {
  name: "Spinner",
  props: {
    condition: {
      type: Boolean,
      default: () => true
    },
    config: {
      type: Object,
      default: () => ({
        "animation-duration": 1000,
        size: 75,
        color: "#0067ac"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
  margin: 2em auto;
}
</style>
