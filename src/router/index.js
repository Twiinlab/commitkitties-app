import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Kitty from '@/components/Kitty'
import Settings from '@/components/Settings'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
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
			path: '/settings',
			name: 'Settings',
			component: Settings,
            meta: {
                requiresAuth: true
            }
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
