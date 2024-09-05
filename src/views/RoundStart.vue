<template>
  <h1 v-html="t('roundStart.title', {round})"></h1>

  <template v-if="round > 1">
    <h4 v-html="t('roundStart.income.title')"></h4>
    <ul>
      <li v-html="t('roundStart.income.activeIncome')"></li>
    </ul>
    <div v-if="hasEasyDifficulty" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.easy.noIncome')"></div>
  </template>

  <template v-if="round < 5">
    <h4 v-html="t('roundStart.headstreams.title')"></h4>
    <ul>
      <li v-html="t('roundStart.headstreams.placeWaterDrops')"></li>
    </ul>
  </template>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import RouteCalculator from '@/services/RouteCalculator'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import hasDifficultyLevel from '@/util/hasDifficultyLevel'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'RoundStart',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const round = getIntRouteParam(route, 'round')
    const routeCalculator = new RouteCalculator({round})

    return { t, state, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1) {
        return `/round/${this.round-1}/end`
      }
      else {
        return ''
      }
    },
    hasEasyDifficulty() : boolean {
      return hasDifficultyLevel(DifficultyLevel.EASY, this.state)
    }
  },
  methods: {
    next() : void {
      this.$router.push(this.routeCalculator.getFirstTurnRouteTo(this.state))
    }
  }
})
</script>
