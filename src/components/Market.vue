<template>
    <div id="dashboard" class="explainer-bg">
        <section>
            <div>
                <h1>Market</h1>
                <div class="profile">
                    <label>MY KITTIES</label>
                    <md-card v-if="(getMyKitties()).length == 0">
                        <md-card-media>
                            <img src="@/assets/images/noKitty.png" alt="logo">
                        </md-card-media>
                        <md-card-header>
                            <div class="md-subhead">You don´t own kitties yet</div>
                        </md-card-header>                        
                    </md-card>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in getMyKitties()" v-bind:key="kitty.id">
                            <md-card >
                                <md-card-media>
                                    <img v-if="kitty.image_url" v-bind:src="kitty.image_url" alt="People">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-subhead">{{kitty.name|truncate(30)}}</div>
                                    <div class="md-subhead">Ξ  {{ kitty.value|weitoether(4) }}</div>
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
                                    <div class="md-subhead">Ξ  {{ kitty.value|weitoether(4) }}</div>
                                </md-card-header>                                
                            </md-card>
                        </router-link>
                    </div>
                    <label>ON SALE</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in getOnSaleKitties()"  v-bind:key="kitty.id">
                            <md-card >
                                <md-card-media>
                                    <img v-if="kitty.image_url" v-bind:src="kitty.image_url" alt="People">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-subhead">{{kitty.name|truncate(30)}}</div>
                                    <div class="md-subhead">Ξ {{ kitty.value|weitoether(4) }}</div>
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
            ...mapState('users', ['userProfile']),
            ...mapGetters('kitties', ['kitties','onSaleKitties','myKitties'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKitties','fetchOnSaleKitties','fetchMyKitties']),
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            },
            getMyKitties(){
                if (!this.userProfile || !this.userProfile.wallet || !this.kitties) return [];
                return this.kitties.filter(kitty => {
                    return ((kitty.owner && kitty.owner.address).toUpperCase() == (this.userProfile.wallet.address).toUpperCase()) 
                    });
            },
            getOnSaleKitties(){
                if (!this.kitties) return [];
                return this.kitties.filter(kitty => kitty.auction.price );
            }
        }
    }
</script>
