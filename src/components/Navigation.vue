<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="dashboard"><h3>Vuegram</h3></router-link>
                <ul v-if="userIsAuthenticated" class="inline">
                    <li><router-link to="dashboard">Dashboard</router-link></li>
                    <li><router-link to="settings">Settings</router-link></li>
                    <li><a @click="logout">logout</a></li>
                </ul>
                <ul v-else class="inline">
                    <li><router-link to="dashboard">Dashboard</router-link></li>
                    <li><a @click="login">login</a></li>
                </ul>
            </div>
        </section>
    </header>
</template>

<script>
    import firebase from 'firebase'
    const fb = require('../firebaseConfig.js')

    export default {
        computed: {
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        },
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('users/clearData')
                    //this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            },
            login() {
                fb.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
                    this.$store.commit('users/setCurrentUser', user)
                    this.$store.dispatch('users/fetchUserProfile')
                    //this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
