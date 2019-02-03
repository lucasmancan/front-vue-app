
import Router from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import auth from './services/auth-service'
 const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            children: [{
                path: '/',
                component: Login    
            },{
                path: '/register',
                component: Register    
            }]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/account',
            component: Account
        }

    ]
}
)

router.beforeEach((to, from, next) => {
next()
 });

export default router;