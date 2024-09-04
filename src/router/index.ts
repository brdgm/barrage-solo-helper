import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import TurnBot from '@/views/TurnBot.vue'
import RoundStart from '@/views/RoundStart.vue'
import RoundEnd from '@/views/RoundEnd.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  { 
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  { 
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/round/:round/turn/:turn/player/:player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/bot/:bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/round/:round/turn/:turn/bot/:bot/action/:action',
    name: 'TurnBotAction',
    component: TurnBot
  },
  {
    path: '/round/:round/turn/:turn/bot/:bot/action/:action/worker/:worker',
    name: 'TurnBotActionWorker',
    component: TurnBot
  },
  {
    path: '/round/:round/start',
    name: 'RoundStart',
    component: RoundStart
  },
  {
    path: '/round/:round/end',
    name: 'RoundEnd',
    component: RoundEnd
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')