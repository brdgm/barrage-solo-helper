<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>actionCard</b>: {{actionCard}}<br/>
      <b>criteriaCard</b>: {{criteriaCard}}<br/>
    </p>
    <p v-if="navigationState.turn > 1" class="debug fw-bold">Previous turns:</p>
    <ul v-if="navigationState.turn > 1" class="debug">
      <li v-for="turn in getPreviousTurns().toReversed()" :key="turn.turn">
        Turn {{turn.turn}}: {{turn.action}} - {{turn.workerUsed}} worker (action: {{turn.actionCard}}, criteria: {{turn.criteriaCard}})
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import BotNavigationState from '@/util/BotNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Cards from '@/services/Cards'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    actionCard() {
      const { id, actions } = this.cardDeck.actionCard!
      return { id, actions }
    },
    criteriaCard() {
      const { id, placingCriteriaDamElevation, locationDamElevation,
        placingCriteriaConduit, locationConduit, locationConduitPosition,
        placingCriteriaPowerhouse, locationPowerhouse, waterManagementBasinColumns
       } = this.cardDeck.criteriaCard!
      return { id, placingCriteriaDamElevation, locationDamElevation,
        placingCriteriaConduit, locationConduit, locationConduitPosition,
        placingCriteriaPowerhouse, locationPowerhouse, waterManagementBasinColumns }
    }
  },
  methods: {
    getPreviousTurns() : {round: number, turn: number, actionCard?: string, criteriaCard?: string,
          action?: Action, workerUsed?: number}[] {
      const currentRound = this.state.rounds.find(round => round.round == this.navigationState.round)
      if (currentRound) {
        return currentRound.turns.filter(turn => turn.turn < this.navigationState.turn && turn.bot == this.navigationState.bot
            && turn.actionCard != undefined && turn.criteriaCard != undefined && turn.action != undefined)
          .map(turn => {
            const actionCard = Cards.get(turn.actionCard ?? '')
            const botActions = new BotActions(actionCard, this.navigationState.round, this.navigationState.bot, this.state)
            return {round: turn.round, turn: turn.turn, actionCard: turn.actionCard, criteriaCard: turn.criteriaCard,
                action: botActions.items[turn.action ?? 0]?.action, workerUsed: turn.workerUsed}
          })
      }
      return []
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
p.debug, ul.debug {
  margin: 0;
}
</style>
