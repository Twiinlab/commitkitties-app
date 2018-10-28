<template>
    <div id="dashboard">
        <section>
            <div>
                <h1>Market</h1>
                <div class="profile">
                    <label>RECENTLY LISTED</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in kitties" v-bind:key="kitty.id">
                            <md-card >
                                <md-card-media>
                                    <img v-if="kitty.image_url" v-bind:src="kitty.image_url" alt="People">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-title">Title goes here</div>
                                    <div class="md-subhead">Subtitle here</div>
                                </md-card-header>                                
                            </md-card>
                        </router-link>
                    </div>
                    <label>ON SALE</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-for="kitty in onSaleKitties" v-if="kitty.image_url" v-bind:key="kitty.id">
                            <md-card >
                                <md-card-media>
                                    <img v-if="kitty.image_url" v-bind:src="kitty.image_url" alt="People">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-title">Title goes here</div>
                                    <div class="md-subhead">Subtitle here</div>
                                </md-card-header>                                
                            </md-card>
                        </router-link>
                    </div>
                </div>
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
  .profile{
      display: grid;
  }

  .scrolling-wrapper{
    //overflow-x: scroll;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
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
            this.fetchKitties();
            this.fetchOnSaleKitties(5);
        },
        computed: {
            ...mapGetters('kitties', ['kitties','onSaleKitties'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKitties','fetchOnSaleKitties']),
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            }
        }
    }
</script>
