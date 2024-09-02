<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions">
    <ol>
      <li v-html="t('setupBot.botColor')"></li>
      <li v-html="t('setupBot.firstPlayerScoreTrack')"></li>
    </ol>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      showStartingSpace: false
    }
  },
  methods: {
    startGame() : void {
      this.$router.push('/turn/1/bot')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
