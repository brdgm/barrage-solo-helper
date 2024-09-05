<template>
  <h1 v-html="t('roundEnd.title', {round})"></h1>

  <h4 v-html="t('roundEnd.waterFlow.title')"></h4>
  <ul>
    <li v-html="t('roundEnd.waterFlow.flowDown')"></li>
  </ul>

  <h4 v-html="t('roundEnd.scoring.title')"></h4>
  <ul>
    <li v-html="t('roundEnd.scoring.firstSecondPlayer')"></li>
    <li v-html="t('roundEnd.scoring.gainCredits')"></li>
    <li v-html="t('roundEnd.scoring.bonusTile')"></li>
  </ul>

  <template v-if="round < 5">
    <h4 v-html="t('roundEnd.determinePlayerOrder.title')"></h4>
    <DeterminePlayerOrder :playerOrder="currentPlayerOrder" @newPlayerOrder="values => newPlayerOrder = values"/>

    <h4 v-html="t('roundEnd.cleanUp.title')" class="mt-2"></h4>
    <ul>
      <li v-html="t('roundEnd.cleanUp.resetEnergyMarkers')"></li>
      <li v-html="t('roundEnd.cleanUp.takeBackEngineers')"></li>
      <li v-html="t('roundEnd.cleanUp.discardTechnologyTiles')"></li>
      <li v-if="hasLeeghwaterProject" v-html="t('roundEnd.cleanUp.discardExternalWorkTiles')"></li>
    </ul>
  </template>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" :disabled="!hasValidPlayerOrder">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { PlayerOrder, useStateStore } from '@/store/state'
import RouteCalculator from '@/services/RouteCalculator'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import DeterminePlayerOrder from '@/components/structure/DeterminePlayerOrder.vue'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'RoundEnd',
  components: {
    FooterButtons,
    DeterminePlayerOrder
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const round = getIntRouteParam(route, 'round')
    const currentPlayerOrder = state.getPlayerOrder(round)

    const routeCalculator = new RouteCalculator({round})

    return { t, state, round, currentPlayerOrder, routeCalculator }
  },
  data() {
    return {
      newPlayerOrder: [] as PlayerOrder[]
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    hasValidPlayerOrder() : boolean {
      return this.newPlayerOrder.length == this.currentPlayerOrder.length
          || this.round == 5
    },
    hasLeeghwaterProject() : boolean {
      return this.state.setup.expansions.includes(Expansion.LEEGHWATER_PROJECT)
    }
  },
  methods: {
    next() : void {
      if (this.round == 5) {
        this.$router.push('/gameEnd')
      }
      else {
        // prepare next round
        this.state.storeRound({
          round: this.round+1,
          playerOrder: this.newPlayerOrder,
          turns: []
        })
        this.$router.push(`/round/${this.round+1}/start`)
      }
    }
  }
})
</script>
