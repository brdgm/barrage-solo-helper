<template>
  <h1 v-html="t('gameEnd.title')"></h1>

  <ul class="mt-3">
    <li v-html="t('gameEnd.objectiveTile')"></li>
    <li v-html="t('gameEnd.resourcesLeft')"></li>
    <ul>
      <li class="small" v-html="t('gameEnd.resourcesLeftExplanation')"></li>
    </ul>
    <li v-html="t('gameEnd.damWater')"></li>
    <li v-if="hasLeeghwaterProject" v-html="t('gameEnd.privateBuildingTiles')"></li>
  </ul>

  <p v-html="t('gameEnd.winner')"></p>
  <p v-html="t('gameEnd.tiebreaker')"></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion';

export default defineComponent({
  name: 'GameEnd',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/5/end`
    },
    hasLeeghwaterProject() : boolean {
      return this.state.setup.expansions.includes(Expansion.LEEGHWATER_PROJECT)
    }
  }
})
</script>

<style lang="scss" scoped>
div > ul > li {
  margin-top: 0.5rem;
}
</style>