<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>actionCard</b>: {{actionCard}}<br/>
      <b>criteriaCard</b>: {{criteriaCard}}<br/>
    </p>
    <table class="debug">
      <tr>
        <th v-for="bot of navigationState.botCount" :key="bot">Automa {{bot}}</th>
      </tr>
      <tr>
        <td v-for="bot of navigationState.botCount" :key="bot">
          <ul v-if="navigationState.turn > 1">
            <li v-for="turn in getBotPreviousTurns(bot).toReversed()" :key="turn.turn">
              {{turn.turn}}: {{turn.action}} - {{turn.workerUsed}}w (act: {{turn.actionCard}}, crit: {{turn.criteriaCard}})
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import BotNavigationState from '@/util/BotNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import getPreviousTurns from '@/util/getPreviousTurns'
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
    getBotPreviousTurns(currentBot: number) : {round: number, turn: number, bot: number, actionCard?: string, criteriaCard?: string,
          action?: Action, workerUsed?: number}[] {
      const { round, turn, bot } = this.navigationState
      const turns = getPreviousTurns({state: this.state, round, turn, bot})
      return turns
          .filter(turn => turn.bot == currentBot)
          .map(turn => {
            const actionCard = Cards.get(turn.actionCard ?? '')
            const botActions = new BotActions(actionCard, round, turn.bot ?? 0, this.state)
            return {round: turn.round, turn: turn.turn, bot: turn.bot ?? 0, actionCard: turn.actionCard, criteriaCard: turn.criteriaCard,
                action: botActions.items[turn.action ?? 0]?.action, workerUsed: turn.workerUsed}
          })
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
