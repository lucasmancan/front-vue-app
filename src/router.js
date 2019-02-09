
import Router from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import User from './components/User'
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
            component: Account,
            children: [
                { path: '', component: User, props: { userId: {} }},

            ]
        }

    ]
}
)
router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
       NProgress.start();
    }
    next();
  })
  
  router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
   NProgress.done();
  })
  


export default router;