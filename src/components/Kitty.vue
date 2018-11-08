<template>
    <div id="dashboard" class="explainer-bg">
        <section>
            <div class="col1">
                <div class="profile">
                    <img v-if="selectedKitty.image_url" v-bind:src="selectedKitty.image_url" alt="People">
                </div>
            </div>
            <div class="col2">
                <div class="profile">
                    <h1>{{selectedKitty.name}}</h1>
                    <h3>Bio</h3>
                    <p>{{selectedKitty.bio}}</p>
                    <md-card>
                        <md-card-area>
                          <md-card-content>
                              <div class="saletag">  
                                  <div>
                                    <p>Value:</p>
                                    <h2>Ξ  {{ selectedKitty.value|weitoether(4) }}</h2>
                                  </div>
                                  <div>
                                    <p>New Prize:</p>
                                    <h2>Ξ  <input  style="font-size: inherit;" value="0.0072" type="number"/></h2>
                                  </div>
                              </div>  
                          </md-card-content>
                        </md-card-area>
                        <md-card-actions md-alignment="left">
                            <md-button class="md-primary md-raised" v-if="!isMyKitty()" @click.native="onBuyKitty()" style="width: 200px;">Buy</md-button>
                            <div v-if="isMyKitty() && !isInAuction()">
                                <md-button class="md-primary md-raised" @click.native="onPutOnSaleKitty()">Put on Sale</md-button>
                            </div>
                        </md-card-actions>
                    </md-card>
                </div>
            </div>
        </section>
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
</style>

<script>
    const fb = require('../firebaseConfig.js')
    const contracts = require('../plugins/contracts')

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
            ...mapGetters('kitties', ['selectedKitty']),
            ...mapState('users', ['userProfile'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKittyById']),
            isMyKitty(){
                if (!this.userProfile.wallet || !this.selectedKitty.owner) return false;
                return this.userProfile.wallet.address.toUpperCase() == this.selectedKitty.owner.address.toUpperCase()
            },
            isInAuction(){
                return this.selectedKitty.auction.price;
            },
            onBuyKitty(){
                contracts.bidAuction(this.selectedKitty.id, this.selectedKitty.auction.price, this.userProfile.wallet).then(()=>{
                    console.log(`bidAuction kittyId: ${this.selectedKitty.id} price: ${this.selectedKitty.auction.price}`)
                })
            },
            onPutOnSaleKitty(){
                contracts.invokeMethod('createSaleAuction', [this.selectedKitty.id, this.kittyPrice, this.kittyPrice, this.kittyPrice], this.userProfile.wallet).then(()=>{
                    console.log(`createSaleAuction kittyId: ${this.selectedKitty.id} price: ${this.kittyPrice}`)
                })
            }
        }
    }
</script>
