<template>
    <div id="dashboard" class="explainer-bg">
        <section>
            <div class="col1">
                <div class="profile">
                    <h3>Profile</h3>
                    <p>Update your info</p>
                    <transition name="fade">
                        <p v-if="showSuccess" class="success">profile updated</p>
                    </transition>
                    <form @submit.prevent>
                        <label for="name">Display Name</label>
                        <input v-model.trim="displayName" type="text" :placeholder="userProfile.displayName" id="displayName" />
                        <label for="title">Email</label>
                        <input v-model.trim="email" type="text" :placeholder="userProfile.email" id="email" />
                        <button @click="updateProfile" class="button">Update Profile</button>
                    </form>
                </div>
            </div>
            <div class="col2">
                <div>
                    <md-tabs md-sync-route>
                        <md-tab id="tab-home" md-label="Kitties" >
                            <md-card v-if="myKitties.length == 0">
                                <md-card-media>
                                    <img src="@/assets/images/noKitty.png" alt="logo">
                                </md-card-media>
                                <md-card-header>
                                    <div class="md-subhead">You don´t own kitties yet</div>
                                </md-card-header>                        
                            </md-card>
                            <div class="scrolling-wrapper">
                                <router-link :to="{ name: 'Kitty', params: { id: kitty.id}}" v-if="kitty.image_url" v-for="kitty in myKitties" v-bind:key="kitty.id">
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
                        </md-tab>
                        <md-tab id="tab-pages" md-label="Activity" >
                            <md-list class="md-double-line">
                                <div v-for="activity in userActivity" v-bind:key="activity.id">
                                    <md-list-item >
                                        <md-icon class="md-primary">{{getIcon(activity.type)}}</md-icon>
                                        <div class="md-list-item-text">
                                            <span>{{activity.type}}</span>
                                            <span>Ξ  {{activity.tx.value|weitoether(4)}}</span>
                                        </div>
                                    </md-list-item>
                                    <md-divider class="md-inset"></md-divider>
                                </div>
                            </md-list>
                        </md-tab>
                    </md-tabs>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions  } from 'vuex'

    export default {
        data() {
            return {
                displayName: '',
                email: '',
                showSuccess: false
            }
        },
        created() {
            this.fetchMyKitties('Ix0Mo3CbhbegnTft36X0yCUWnhJ3');
        },
        computed: {
            ...mapGetters('users', ['userProfile','userActivity']),
            ...mapGetters('kitties', ['myKitties'])
        },
        methods: {
            ...mapActions('kitties', ['fetchMyKitties']),
            updateProfile() {
                this.$store.dispatch('users/updateProfile', {
                    displayName: this.displayName !== '' ? this.displayName : this.userProfile.displayName,
                    email: this.email !== '' ? this.email : this.userProfile.email
                })

                this.displayName = ''
                this.email = ''

                this.showSuccess = true

                setTimeout(() => { this.showSuccess = false }, 2000)
            },
            getIcon(type){ 
                switch(type) {
                    case "Transfer":
                        return "shopping_cart"
                    case "AuctionCreated":
                        return "add_shopping_cart"
                    case "AuctionSuccessful":
                        return "swap_horiz"
                    default:
                        return "shopping_cart"
                }
            }
        }
    }
</script>

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
