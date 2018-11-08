<template>
  <div class="app-loader" v-if="showLoader">
    <spinner :condition="false"></spinner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from "@/components/Spinner";

export default {
  name: 'AppLoader',
  components: {
    Spinner
  },
  computed: {
    ...mapGetters('loader', ['showLoader']),
  }
}
</script>

<style lang="scss" scoped>

h1 {
  font-size: 20em
}
.app-loader {
  position: fixed;
  padding-top: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(255,255,255, 0.8);
}

</style>
