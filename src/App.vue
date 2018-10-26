<template>
    <div id="app">
        <!--<Navigation v-if="currentUser"></Navigation>-->
        <Navigation></Navigation>
    	<router-view/>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Navigation from './components/Navigation.vue'

    export default {
        components: { Navigation },
        computed: {
            ...mapState('users', ['currentUser'])
        }
    }
</script>
