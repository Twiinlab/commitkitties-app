<template>
    <div id="dashboard" class="explainer-bg">
        <section>
            <div class="col2">
                <h1>Ranking</h1>
                <div class="profile">
                    <label>TOP USERS</label>
                    <md-list class="md-triple-line">
                        <md-list-item v-for="user in ranking" v-bind:key="user.id" >
                            <md-avatar>
                                <img v-if="user.photoURL" v-bind:src="user.photoURL" alt="People">
                            </md-avatar>
                            <div class="md-list-item-text">
                                <span>{{user.displayName}}</span>
                                <span>{{user.email}}</span>
                                <p><b>Balance:</b> Ξ  0.020</p>
                            </div>
                            <md-button class="md-icon-button md-list-action">
                                <md-icon class="md-primary">star</md-icon>
                            </md-button>
                        </md-list-item>
                    </md-list>
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

<style lang="scss" scoped>
  .profile{
      display: grid;
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
            this.fetchRanking();
        },
        computed: {
            ...mapState('users', ['ranking']),
            ...mapGetters('users', ['ranking'])
        },
        methods: {
            ...mapActions('users', ['fetchRanking']),
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
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
