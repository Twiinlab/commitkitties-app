<template>
    <div id="dashboard">
        <section>
            <div>
                <h1>Market</h1>
                <div class="profile">
                    <label>MY KITTIES</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in myKitties" v-bind:key="kitty.id">
                            <md-card >
                                <md-card-media>
                                    <img v-if="kitty.image_url" v-bind:src="kitty.image_url" alt="People">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-subhead">{{kitty.name|truncate(30)}}</div>
                                    <div class="md-subhead">Ξ  0.020</div>
                                </md-card-header>                           
                            </md-card>
                        </router-link>
                    </div>
                    <label>RECENTLY LISTED</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in kitties" v-bind:key="kitty.id">
                            <md-card >
                                <md-card-media>
                                    <img v-if="kitty.image_url" v-bind:src="kitty.image_url" alt="People">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-subhead">{{kitty.name|truncate(30)}}</div>
                                    <div class="md-subhead">Ξ  0.020</div>
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
                                    <div class="md-subhead">{{kitty.name|truncate(30)}}</div>
                                    <div class="md-subhead">Ξ  0.020</div>
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
            this.fetchMyKitties('Ix0Mo3CbhbegnTft36X0yCUWnhJ3');
        },
        computed: {
            ...mapGetters('kitties', ['kitties','onSaleKitties','myKitties'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKitties','fetchOnSaleKitties','fetchMyKitties']),
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            }
        },
        filters: {
            truncate: function(value, limit) {
                if (value.length > limit) {
                    value = value.substring(0, (limit - 3)) + '...';
                }
                return value
            }
        }
    }
</script>
