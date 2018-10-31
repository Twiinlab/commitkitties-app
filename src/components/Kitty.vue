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
                                    <md-button v-if="currentUser.userId==selectedKitty.owner.userId" >Buy</md-button>
                                    <md-button v-else>Sell</md-button>
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
            ...mapState('users', ['currentUser'])
        },
        methods: {
            ...mapActions('kitties', ['fetchKittyById'])
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
