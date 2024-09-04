<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnBot.title',{bot:bot},botCount)}}
  </h1>

  <BotAction v-if="navigationState.actionItem && navigationState.cardDeck.criteriaCard"
      :is="`action-${navigationState.actionItem.action}`"
      :actionItem="navigationState.actionItem"
      :criteriaCard="navigationState.cardDeck.criteriaCard"
      :navigationState="navigationState"/>

  <button class="btn btn-success btn-lg mt-4" @click="next()">
    {{t('turnBot.done', navigationState.actionItem?.workerCount ?? 0)}}
  </button>
  <button class="btn btn-danger btn-lg mt-4 ms-2" @click="notPossible()" v-if="!isBankAction">
    {{t('turnBot.notPossible')}}
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
import BotAction from '@/components/turn/BotAction.vue'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    PlayerColorIcon,
    SideBar,
    DebugInfo,
    BotAction
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new BotNavigationState(route, state)
    const { botCount, round, turn, action, workerUsedPreviousAction, bot, playerColor} = navigationState
    const routeCalculator = new RouteCalculator({round, turn, action, workerUsedPreviousAction, bot})

    return { t, state, botCount, round, turn, bot, playerColor, routeCalculator, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    isBankAction() : boolean {
      return this.navigationState.actionItem?.action == Action.BANK
    }
  },
  methods: {
    next() : void {
      if (this.navigationState.actionItem?.nextAction) {
        this.$router.push(this.routeCalculator.getNextActionRouteTo(this.navigationState.actionItem?.workerCount))
        return
      }
      const workerUsed = (this.navigationState.actionItem?.workerCount ?? 0) + (this.navigationState.workerUsedPreviousAction ?? 0)
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
    },
    notPossible() : void {
      this.$router.push(this.routeCalculator.getNextActionRouteTo(this.navigationState.workerUsedPreviousAction))
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
