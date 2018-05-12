import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Project from '@/components/Project'
import Team from '@/components/Team'
import Self from '@/components/Self'
import RankDetail from '@/components/RankDetail'
import Login from '@/components/Login'
import Complete from '@/components/Complete'
import Contact from '@/components/Contact'
import Control from '@/components/Control'
import HeroDetail from '@/components/HeroDetail'
import SoftDetail from '@/components/SoftDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/self',
      name: 'Self',
      component: Self
    },
    {
      path: '/rankDetail/:id',
      name: 'RankDetail',
      component: RankDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/complete',
      name: 'Complete',
      component: Complete
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/control',
      name: 'Control',
      component: Control
    },
    {
      path: '/heroDetail/:heroid',
      name: 'HeroDetail',
      component: HeroDetail
    },
    {
      path: '/softDetail/:softid',
      name: 'SoftDetail',
      component: SoftDetail
    }
  ]
})
