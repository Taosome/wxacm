import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Project from '@/components/Project'
import Team from '@/components/Team'
import Self from '@/components/Self'
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
    }
  ]
})
