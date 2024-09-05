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
      :navigationState="navigationState"
      @workerPlaced="workerPlaced"/>

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
import { ref } from 'vue'

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

    const workerUsed = ref(navigationState.actionItem?.workerCount ?? 0)
    const nextAction = ref(navigationState.actionItem?.nextAction ?? false)

    return { t, state, botCount, round, turn, bot, playerColor, routeCalculator, navigationState, workerUsed, nextAction }
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
      if (this.nextAction) {
        this.$router.push(this.routeCalculator.getNextActionRouteTo(this.workerUsed))
        return
      }
      const workerUsedTotal = this.workerUsed + (this.navigationState.workerUsedPreviousAction ?? 0)
      const workerLeft = this.navigationState.workerCount - workerUsedTotal
      const passed = workerLeft <= 0 ? true : undefined
      this.state.storeTurn({
        round:this.round,
        turn:this.turn,
        bot:this.bot,
        cardDeck: this.navigationState.cardDeck.toPersistence(),
        workerUsed: workerUsedTotal,
        passed: passed ? true : undefined
      })
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    },
    notPossible() : void {
      this.$router.push(this.routeCalculator.getNextActionRouteTo(this.navigationState.workerUsedPreviousAction))
    },
    workerPlaced(workerUsed: number, nextAction: boolean) {
      this.workerUsed = workerUsed
      this.nextAction = nextAction
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
