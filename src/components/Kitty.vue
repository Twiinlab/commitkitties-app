<template>
    <div id="dashboard" class="explainer-bg">
        <!-- <app-loader /> -->
        <spinner class="spinner" :condition="!showLoading"></spinner>
        <section>
            <div class="col1">
                <h1>Kitty On Sale {{showLoading}}</h1>
                <div class="profile">
                    <img v-if="selectedKitty.image_url" v-bind:src="selectedKitty.image_url" alt="People">
                </div>
            </div>
            <div class="col2">
                <div class="profile">
                    <h1>{{selectedKitty.name}}</h1>
                    <h3>Bio</h3>
                    <p>{{selectedKitty.bio}}</p>
                    <p><span class="md-subheading">Value:</span> Ξ {{ selectedKitty.value|weitoether(4) }}</p>
                    <md-card>
                        <md-card-area>
                          <md-card-content>
                              <div class="saletag">  
                                  <div>
                                    <p><span class="md-subheading">Auction price:</span></p>
                                    <h2>Ξ {{getAuctionPrice()}}</h2>
                                  </div>
                                  <div v-if="isMyKitty() && !isInAuction()">
                                    <p><span class="md-subheading">New Prize:</span></p>
                                    <h2>Ξ  <input  style="font-size: inherit;" v-model="kittyPrice" :placeholder="kittyPrice" type="number"/></h2>
                                  </div>
                              </div>  
                          </md-card-content>
                        </md-card-area>
                        <md-card-actions md-alignment="left">
                            <div v-if="!isMyKitty() && isInAuction()">
                                <md-button class="md-primary md-raised" @click.native="onBuyKitty()" style="width: 200px;">Buy</md-button>
                            </div>
                            <div v-if="isMyKitty() && !isInAuction()">
                                <md-button class="md-primary md-raised" @click.native="onPutOnSaleKitty(newPrice)">Put on Sale</md-button>
                            </div>
                        </md-card-actions>
                    </md-card>
                </div>
            </div>
        </section>
        <md-snackbar v-bind:style="{ 'background-color': notificationColor}" :md-position="'center'" :md-active.sync="showSnackbar" md-persistent>
            <span>{{notificationMsg}}</span>
        </md-snackbar>
    </div>
    
</template>

<style lang="scss" scoped>
  .saletag{
      display: flex;
      align-items: center;
  }
  .saletag > div {
        flex: 1;
  }
  .profile{
      display: grid;
  }
  .md-card {
    width: 100%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .spinner{
    z-index: 10;
    position: fixed;
    top: 20%;
    /* left: 25%; */
    /* float: left; */
    width: 100%;
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
                errorMsg: '',
                kittyPrice: 0,
                newPrice: null,
                showLoading: false,
                showSnackbar: false,
                notificationColor: 'lightgreen',
                notificationMsg: ''
            }
        },
        created() {
            this.fetchKittyById(this.$route.params.id);
            console.log("selectedKitty:"+this.selectedKitty);
            this.kittyPrice = 0;
        },
        mounted() {
            this.kittyPrice = parseFloat(this.$options.filters.weitoether(this.selectedKitty.value, 4));
        },
        computed: {
            ...mapGetters('kitties', ['selectedKitty']),
            ...mapState('users', ['userProfile'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKittyById','updateKittie']),
            getAuctionPrice(){
            if (!this.selectedKitty.auction || !this.selectedKitty.auction.price) {
                return this.$options.filters.weitoether(this.selectedKitty.value, 4);
            }
            return this.$options.filters.weitoether(this.selectedKitty.auction.price, 4);
            },
            isMyKitty(){
                if (!this.userProfile.wallet || !this.selectedKitty.owner) return false;
                return this.userProfile.wallet.address.toUpperCase() == this.selectedKitty.owner.address.toUpperCase()
            },
            isInAuction(){
                return this.selectedKitty.auction && this.selectedKitty.auction.price;
            },
            onShowLoading(showLoading){
              this.showLoading = showLoading;
            },
            onShowNotification(isOk){
              this.notificationColor = isOk ? 'lightgreen' : 'lightcoral';
              this.showSnackbar = true;
              this.notificationMsg = isOk ? 'Cool! Everything was fine!' : 'Ups! Something happened!';
            },
            onBuyKitty(){
              try {
                  this.onShowLoading(true);
                  contracts.bidAuction(this.selectedKitty.id, this.selectedKitty.auction.price, this.userProfile.wallet).then(()=>{
                    console.log(`bidAuction kittyId: ${this.selectedKitty.id} price: ${this.selectedKitty.auction.price}`)
                    let selectedKitty = Object.assign({}, this.selectedKitty);
                    selectedKitty.owner = { address: this.userProfile.wallet.address};
                    this.updateKittie(selectedKitty);
                    this.onShowLoading(false);
                    this.onShowNotification(true);
                  })
                  .catch(error => {
                    this.onShowLoading(false);
                    this.onShowNotification(false);
                  })
                } catch (error) {
                  this.onShowLoading(false);
                  this.onShowNotification(false);
                }
            },
            onPutOnSaleKitty(customPrice){
              try {
                this.onShowLoading(true);
                const price = (this.$options.filters.ethertowei(this.kittyPrice)).toString();
                contracts.invokeMethod('createSaleAuction', [this.selectedKitty.id, price, price, price], this.userProfile.wallet).then(()=>{
                  console.log(`createSaleAuction kittyId: ${this.selectedKitty.id} price: ${price}`)
                  let selectedKitty = Object.assign({}, this.selectedKitty);
                  selectedKitty.auction = { price };
                  this.updateKittie(selectedKitty);
                  this.onShowLoading(false);
                  this.onShowNotification(true);
                })
                .catch(error => {
                    this.onShowLoading(false);
                    this.onShowNotification(false);
                  })
              } catch (error) {
                this.onShowLoading(false);     
                this.onShowNotification(false);
              }
            }
        }
    }
</script>
