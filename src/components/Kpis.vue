<template>
    <div id="dashboard" class="explainer-bg">
        <section>
            <div class="col2">
                <h1>KPIs</h1>
                <div class="profile">
                    <md-table md-card v-model="kpis" >
                        <md-table-toolbar>
                            <h1 class="md-title">System Metrics:</h1>
                        </md-table-toolbar>
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell md-label="Key">{{ item._id }}</md-table-cell>
                            <md-table-cell md-label="Gas Price">{{ item.avgGasPrice|weitoether(10) }}</md-table-cell>
                            <md-table-cell md-label="Count">{{ item.count }}</md-table-cell>
                            <md-table-cell md-label="Used Gas">{{ item.totalGasUsed|weitoether(10) }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                    <md-table md-card v-model="kpis" >
                        <md-table-row slot="md-table-row">
                            <md-table-cell md-label="Key">Keys totals</md-table-cell>
                            <md-table-cell md-label="Gas Price">Gas Price total</md-table-cell>
                            <md-table-cell md-label="Count">Count total</md-table-cell>
                            <md-table-cell md-label="Used Gas">Gas total</md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>
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
        created() {
            this.fetchKpis();
        },
        computed: {
            ...mapState('kpis', ['kpis']),
            ...mapGetters('kpis', ['kpis'])
        },
        methods: {
            ...mapActions('kpis', ['fetchKpis']),
        }
    }
</script>
