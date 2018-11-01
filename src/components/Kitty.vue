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
                            <div class="md-subhead">{{selectedKitty.name|truncate(30)}}</div>
                            <div class="md-subhead">Ξ  0.020</div>
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
    const contracts = require('../store/modules/contracts')

    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                errorMsg: '',
                kittyPrice: 100
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
                return this.userProfile.wallet.address == this.selectedKitty.owner.address;
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
        },
        filters: {
            truncate: function(value, limit) {
                if (value && value.length > limit) {
                    value = value.substring(0, (limit - 3)) + '...';
                }
                return value
            }
        }
    }
</script>
