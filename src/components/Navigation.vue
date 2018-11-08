<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="/home"><h3>CommitKitties</h3></router-link>
                <ul v-if="userProfile.userId" class="inline">
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/ranking">Ranking</router-link></li>
                    <li><router-link to="/market">Market</router-link></li>
                    <li><router-link to="/profile">Profile</router-link></li>
                    <li><a @click="logout">logout</a></li>
                    <li>
                        <md-list-item class="md-dense" style="top:-15px;">
                        <md-avatar>
                            <img :src="userProfile.photoURL" alt="People">
                        </md-avatar>
                        <div class="md-list-item-text">
                            <span>{{userProfile.displayName}}</span>
                            <span>Ξ {{userBalance}}</span>
                        </div>
                        </md-list-item>
                    </li>
                </ul>
                <ul v-else class="inline">
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/ranking">Ranking</router-link></li>
                    <li><router-link to="/market">Market</router-link></li>
                    <li><a @click="login">login</a></li>

                    <!-- <md-menu md-direction="bottom-start">
                        <md-button md-menu-trigger>
                            <md-list-item class="md-dense" style="top:-15px;">
                                <md-avatar>
                                    <img src="https://placeimg.com/40/40/people/1" alt="People">
                                </md-avatar>
                                <div class="md-list-item-text">
                                    <span>Ali Connors</span>
                                    <span>Brunch this weekend?</span>
                                </div>
                            </md-list-item>
                        </md-button>
                        <md-menu-content>
                            <md-menu-item>My Item 1</md-menu-item>
                            <md-menu-item>My Item 2</md-menu-item>
                            <md-menu-item>My Item 3</md-menu-item>
                        </md-menu-content>
                    </md-menu> -->
                </ul>
            </div>
        </section>
    </header>
</template>

<style scoped>

header{
    top: 0px;
    position: sticky;
}

</style>

<script>
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')

    export default {
        computed: {
            ...mapState('users', ['currentUser','userProfile','userBalance'])
        },
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('users/clearData')
                }).catch(err => {
                    console.log(err)
                })
            },
            login() {
                fb.auth.signInWithPopup(new fb.firebase.auth.GoogleAuthProvider())
                .then(fbUser => {
                    const user = fbUser.user
                    //TODO: following calls don't interact but don't crash neither ;) 
                    this.$store.commit('users/setCurrentUser', user)
                    this.$store.dispatch('users/fetchUserProfile')
                    this.$store.dispatch('users/fetchUserActivity')
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
