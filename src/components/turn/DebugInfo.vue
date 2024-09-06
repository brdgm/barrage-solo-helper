<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>actionCard</b>: {{actionCard}}<br/>
      <b>criteriaCard</b>: {{criteriaCard}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import BotNavigationState from '@/util/BotNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'

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
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
