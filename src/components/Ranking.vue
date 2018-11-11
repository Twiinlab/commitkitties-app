<template>
    <div id="dashboard" class="explainer-bg">
        <section>
            <div class="col2">
                <h1>Ranking</h1>
                <div class="profile">
                    <md-table v-model="ranking" md-sort="balance" md-sort-order="desc" md-card>
                        <md-table-toolbar>
                            <h1 class="md-title">Top Users</h1>
                        </md-table-toolbar>
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell md-numeric>{{ item.count }}</md-table-cell>
                            <md-table-cell md-label="User" md-sort-by="name">
                                <md-list-item style="display: block;"> 
                                    <md-avatar>
                                        <img v-if="item.user.photoURL" v-bind:src="item.user.photoURL" alt="People">
                                    </md-avatar>
                                    <div class="md-list-item-text">
                                        <span>{{item.user.displayName}}</span>
                                        <span>{{item.user.email}}</span>
                                    </div>
                                </md-list-item>
                            </md-table-cell>
                            <md-table-cell md-label="#Kitties" >{{ item.kitties.length }}</md-table-cell>
                            <md-table-cell md-label="Gas" >{{ item.gas }}</md-table-cell>
                            <md-table-cell md-label="Balance" md-sort-by="balance">{{ item.balance }}</md-table-cell>
                        </md-table-row>
                    </md-table>
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
