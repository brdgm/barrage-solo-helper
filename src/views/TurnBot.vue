<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnBot.title',{bot:bot},botCount)}}
  </h1>

  <p v-for="(action,index) of navigationState.botActions.items" :key="index">{{ action }}</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import RouteCalculator from '@/services/RouteCalculator'
import BotNavigationState from '@/util/BotNavigationState'
import SideBar from '@/components/turn/SideBar.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    PlayerColorIcon,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new BotNavigationState(route, state)
    const botCount = navigationState.botCount
    const round = navigationState.round
    const turn = navigationState.turn
    const bot = navigationState.bot
    const playerColor = navigationState.playerColor
    const routeCalculator = new RouteCalculator({round:round, turn:turn, bot:bot})

    return { t, state, botCount, round, turn, bot, playerColor, routeCalculator, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      const workerUsed = 2
      const workerLeft = this.navigationState.workerCount - workerUsed
      const passed = workerLeft <= 0 ? true : undefined
      this.state.storeTurn({
        round:this.round,
        turn:this.turn,
        bot:this.bot,
        cardDeck: this.navigationState.cardDeck.toPersistence(),
        workerUsed,
        passed: passed ? true : undefined
      })
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.playerColorIcon {
  width: 2rem;
  height: 2rem;
  margin-top: -0.5rem;
}
</style>
