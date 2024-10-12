import { createRouter, createWebHistory } from 'vue-router'
import Caseinfo from '../components/caseinfo.vue'
import Ping from '../components/Ping.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Test from '../components/testbot.vue'
import Kanyan from '../components/kanyanbot.vue'
import Kanyanjilu from '../components/kanyanjilubycaseid.vue'
import Morechat from '../components/kanyanmorechat.vue'
import InspectionReport from '../components/InspectionReport.vue'
import Kanyanjieguo from '../components/kanyanjieguo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'caseinfo',
      component: Caseinfo,
    },
    {
      path: '/ping',
      name: 'ping',
      component: Ping
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/kanyan',
      name: 'kanyan',
      component: Kanyan
    },
    {
      path: '/kanyanjilu',
      name: 'kanyanjilu',
      component: Kanyanjilu
    },

    {
      path: '/morechat',
      name: 'morechat',
      component: Morechat
    },

    {
      path: '/inspectionreport',
      name: 'inspectionreport',
      component: InspectionReport
    },

    {
      path: '/kanyanjieguo',
      name: 'kanyanjieguo',
      component: Kanyanjieguo
    },
  ]
})

export default router
