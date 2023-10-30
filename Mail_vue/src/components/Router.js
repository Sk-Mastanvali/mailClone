
import { createWebHistory, createRouter } from 'vue-router'

import EntryPage from '../components/EntryPage'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import ForgetPswd from '../components/ForgetPswd'
import MailInterface from '../components/MailInterface'
import ComposeMail from '../components/ComposeMail'
import FullMail from '../components/FullMail'
import InBox from '../components/InBox'
import SentBox from '../components/SentBox'
import StarredMes from '../components/StarredMes'
import DelBox from '../components/DelBox'
import UserProfile from '../components/UserProfile'

const routes = [
    {
        path: '/',
        name: 'EntryPage',
        component: EntryPage
    }, {
        path: '/signin',
        name: 'SignIn',
        component: SignIn

    }, {
        path: '/signup',
        name: 'SignUp',
        component: SignUp

    }, {
        path: '/forgetpswd',
        name: 'ForgetPswd',
        component: ForgetPswd
    }, {
        path: '/mail',
        name: 'MailInterface',
        component: MailInterface,
        children: [
            {
                path: '/compose',
                name: 'ComposeMail',
                component: ComposeMail
            },
            {
                path: '/inbox',
                name: 'InBox',
                component: InBox,
            }, {
                path: '/sentbox',
                name: 'SentBox',
                component: SentBox
            }, {
                path: '/starred',
                name: 'StarredMes',
                component: StarredMes
            }, {
                path: '/deleted',
                name: 'DelBox',
                component: DelBox
            },{
                path: '/user',
                name:'UserProfile',
                component: UserProfile
            }
            
        ]
    }, {
        path: '/fullmail/:id',
        name: 'FullMail',
        component: FullMail,
        props: true, // Use props: true to enable route-level props
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;