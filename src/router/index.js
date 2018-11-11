import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/components/Home'
import Market from '@/components/Market'
import Ranking from '@/components/Ranking'
import Dashboard from '@/components/Dashboard'
import Kitty from '@/components/Kitty'
import Profile from '@/components/Profile'
import Kpis from '@/components/Kpis'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			name: 'Home',
			component: Home
		},
		{
			path: '/market',
			name: 'Market',
			component: Market
		},
		{
			path: '/ranking',
			name: 'Ranking',
			component: Ranking
		},
        {
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
            meta: {
                requiresAuth: true
            }
		},
		{
			path: '/kitty/:id',
			name: 'Kitty',
			component: Kitty
		},
        {
			path: '/profile',
			name: 'Profile',
			component: Profile,
            meta: {
                requiresAuth: true
            }
		},
        {
			path: '/kpis',
			name: 'Kpis',
			component: Kpis
		}
	]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
		//next('/home')
		next()
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router
