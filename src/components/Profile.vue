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
                                            <div class="md-subhead">Ξ  0.020</div>
                                        </md-card-header>                           
                                    </md-card>
                                </router-link>
                            </div>
                        </md-tab>
                        <md-tab id="tab-pages" md-label="Activity" >
                            <md-list class="md-double-line">
                                <md-list-item>
                                    <md-icon class="md-primary">shopping_cart</md-icon>
                                    <div class="md-list-item-text">
                                        <span>Kitty Purchase</span>
                                        <span>Ξ  0.050</span>
                                    </div>
                                </md-list-item>
                                <md-divider class="md-inset"></md-divider>
                                <md-list-item>
                                    <md-icon class="md-primary">swap_horiz</md-icon>
                                    <div class="md-list-item-text">
                                        <span>Kitty Exchange</span>
                                        <span>Ξ  0.065</span>
                                    </div>
                                </md-list-item>
                                <md-divider class="md-inset"></md-divider>
                                <md-list-item>
                                    <md-icon class="md-primary">add_shopping_cart</md-icon>
                                    <div class="md-list-item-text">
                                        <span>Kitty Publication</span>
                                        <span>Ξ  0.135</span>
                                    </div>
                                </md-list-item>
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
            ...mapGetters('users', ['userProfile']),
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
