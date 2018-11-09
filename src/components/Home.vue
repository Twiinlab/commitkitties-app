<template>
    <div id="dashboard" class="explainer-bg">
        <section class="landing">
            <div class="Explainer-what">
                <div class="Explainer-ethKitty">
                    <img src="@/assets/images/kitty-eth.svg" alt="Explanation">
                </div>
                <div class="Explainer-what-text">
                    <h2 class="Explainer-headline">Lets kill the hype, BlockChain gets real</h2>
                    <p class="Explainer-description">En la charla desmitificaremos blockchain y las criptomonedas, analizando qué hay realmente detrás de este espectáculo de luces y sonido. Desmontando una de las plataformas más populares en la actualidad sobre Ethereum y analizaremos las claves de su funcionamiento, sus costes y métricas.</p>
                    <div><md-button href="https://www.koliseo.com/events/commit-2018/r4p/5630471824211968/agenda#/5734118109216768/5643309078806528" class="md-raised md-primary">Go to the Talk</md-button></div>
                </div>
            </div>
        </section>
        <section>
            <div>
                <h1>CATALOGUE</h1>
                <div class="profile">
                    <label>ON SALE</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in onSaleKitties"  v-bind:key="kitty.id">
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
                    <label>RECENTLY LISTED</label>
                    <div class="scrolling-wrapper">
                        <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in sampleKitties" v-bind:key="kitty.id">
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

<script>
const fb = require("../firebaseConfig.js");
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      errorMsg: ""
    };
  },
  created() {
    this.fetchSampleKitties();
    this.fetchOnSaleKitties();
  },
  computed: {
    ...mapState("users", ["userProfile"]),
    ...mapGetters("kitties", ["sampleKitties", "onSaleKitties", "myKitties"])
  },
  methods: {
    ...mapActions("kitties", ["fetchSampleKitties","fetchOnSaleKitties","fetchMyKitties"])
  }
};
</script>

<style lang="scss" scoped >
.landing {
  display: grid;
  background-color: white;
  text-align: center;
  margin: 0px 6rem;
}

.Explainer-what {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  padding: 1.5rem;
}
.Explainer-ethKitty {
  position: relative;
  width: 100%;
}
.Explainer-ethKitty:after {
  content: "";
  position: absolute;
  top: -2rem;
  left: 0;
  right: 0;
  width: 6.5rem;
  height: 6.5rem;
  margin: auto;
  background-image: url('../assets/images/ether-diamond.gif');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
}
#dashboard {
  padding: 2rem;
}

.profile {
  display: grid;
}
.scrolling-wrapper {
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