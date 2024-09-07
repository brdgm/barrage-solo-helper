<template>
  <p class="fw-bold fst-italic" v-html="t('rules.actionItem.water-management.intro')"></p>
  <p v-html="t('rules.actionItem.water-management.damReachable')"></p>
  <p v-html="t('rules.actionItem.water-management.damCapacity')"></p>
  <p v-html="t('rules.actionItem.water-management.engineerPlacement')"></p>
  <p v-html="t('rules.actionItem.water-management.tiebreaker')"></p>
  <div class="headwaterCriteria text-center mb-3">
    <HeadwaterCriteria :criteriaCard="criteriaCard"/>
  </div>
  <img v-if="hasFivePlayerExpansion" src="@/assets/map-basin-5player.webp" alt="" class="img-fluid"/>
  <img v-else src="@/assets/map-basin.webp" alt="" class="img-fluid"/>
  <p v-if="hasFivePlayerExpansion" v-html="t('rules.actionItem.water-management.fivePlayerMap')"></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '@/services/Card'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import HeadwaterCriteria from '../rules/HeadwaterCriteria.vue'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'WaterManagementRules',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    HeadwaterCriteria
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    criteriaCard: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  computed: {
    hasFivePlayerExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.FIVE_PLAYER)
    }
  }
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  max-width: 500px;
}
.headwaterCriteria {
  font-size: 20px;
  font-weight: bold;
}
</style>
