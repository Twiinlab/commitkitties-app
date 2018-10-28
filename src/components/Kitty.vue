<template>
    <div id="dashboard">
        <section>
            <div>
                <h1>Kitty On Sale</h1>
                <div class="profile">
                    <md-card v-if="selectedKitty" >
                        <md-card-media>
                            <img v-if="selectedKitty.image_url" v-bind:src="selectedKitty.image_url" alt="People">
                        </md-card-media>
                        <md-card-header>
                            <div class="md-title">Title goes here</div>
                            <div class="md-subhead">Subtitle here</div>
                        </md-card-header>
                    </md-card>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
  .profile{
      display: grid;
  }
  .md-card {
    width: 240px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>

<script>
    const fb = require('../firebaseConfig.js')
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                errorMsg: ''
            }
        },
        created() {
            this.fetchKittyById(this.$route.params.id);
            console.log("selectedKitty:"+this.selectedKitty);
        },
        computed: {
            ...mapGetters('kitties', ['selectedKitty'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKittyById'])
        }
    }
</script>
