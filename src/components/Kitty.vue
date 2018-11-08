<template>
    <div id="dashboard" class="explainer-bg">
        <app-loader />
        <section>
            <div>
                <h1>Kitty On Sale</h1>
                <!-- <spinner :condition="false"></spinner> -->
                <div class="profile">
                    <md-card v-if="selectedKitty" >
                        <md-card-media>
                            <img v-if="selectedKitty.image_url" v-bind:src="selectedKitty.image_url" alt="People">
                        </md-card-media>
                        <md-card-header>
                            <div class="md-subhead">{{selectedKitty.name|truncate(30)}}</div>
                            <div class="md-subhead">Ξ  {{ selectedKitty.value|weitoether(4) }}</div>
                        </md-card-header>
                        <md-card-expand>
                            <md-card-actions md-alignment="space-between">
                                <div>
                                    <md-button v-if="!isMyKitty()" @click.native="onBuyKitty()">Buy</md-button>
                                    <div v-if="isMyKitty() && !isInAuction()">
                                        <input v-model="kittyPrice" type="number"/>
                                        <md-button  @click.native="onPutOnSaleKitty()">Put on Sale</md-button>
                                    </div>
                                </div>
                                <md-card-expand-trigger>
                                    <md-button class="md-icon-button">
                                    <md-icon>keyboard_arrow_down</md-icon>
                                    </md-button>
                                </md-card-expand-trigger>
                            </md-card-actions>
                            <md-card-expand-content>
                                <md-card-content>
                                    {{selectedKitty.bio}}
                                </md-card-content>
                            </md-card-expand-content>
                        </md-card-expand>
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
    const contracts = require('../plugins/contracts')


    import { mapState, mapGetters, mapActions } from 'vuex'
    import Spinner from "@/components/Spinner";
    import AppLoader from "@/components/AppLoader";
    import { LOADER } from '../store/modules/loader';


    export default {
        components: {
            Spinner,
            AppLoader
        },
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
            ...mapGetters('kitties', ['selectedKitty']),
            ...mapState('users', ['userProfile'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKittyById']),
            // ...mapActions('loader', ['loaderToggle']),
            isMyKitty(){
                if (!this.userProfile.wallet || !this.selectedKitty.owner) return false;
                return this.userProfile.wallet.address.toUpperCase() == this.selectedKitty.owner.address.toUpperCase()
            },
            isInAuction(){
                return this.selectedKitty.auction.price;
            },
            onBuyKitty(){
              try {
                
                  this.$store.dispatch(`loader/${LOADER.TOGGLE}`, true, { root: true });
                  contracts.bidAuction(this.selectedKitty.id, this.selectedKitty.auction.price, this.userProfile.wallet).then(()=>{
                      console.log(`bidAuction kittyId: ${this.selectedKitty.id} price: ${this.selectedKitty.auction.price}`)
                  })
                } catch (error) {
                  //Notification error
                } finally {
                //    this.$store.dispatch(`loader/${LOADER.TOGGLE}`, false, { root: true });
                }
            },
            onPutOnSaleKitty(){
              try {
                this.$store.dispatch(`loader/${LOADER.TOGGLE}`, true, { root: true });
                contracts.invokeMethod('createSaleAuction', [this.selectedKitty.id, this.kittyPrice, this.kittyPrice, this.kittyPrice], this.userProfile.wallet).then(()=>{
                    console.log(`createSaleAuction kittyId: ${this.selectedKitty.id} price: ${this.kittyPrice}`)
                })
              } catch (error) {
                //Notification error                
              } finally {
                // this.$store.dispatch(`loader/${LOADER.TOGGLE}`, false, { root: true });
              }
            }
        }
    }
</script>
