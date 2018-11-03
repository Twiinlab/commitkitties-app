<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="/home"><h3>CommitKitties</h3></router-link>
                <ul v-if="currentUser" class="inline">
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/ranking">Ranking</router-link></li>
                    <li><router-link to="/market">Market</router-link></li>
                    <li><router-link to="/profile">Profile</router-link></li>
                    <li>{{userBalance}}</li>
                    <li><a @click="logout">logout</a></li>
                </ul>
                <ul v-else class="inline">
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/ranking">Ranking</router-link></li>
                    <li><router-link to="/market">Market</router-link></li>
                    <li><a @click="login">login</a></li>
                </ul>
                
            </div>
        </section>
    </header>
</template>

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
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
