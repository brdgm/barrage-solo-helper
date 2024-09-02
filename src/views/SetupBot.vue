<template>
  <h1>{{t('setupBot.title')}}</h1>

  <BotCorporation/>
  <BotExecutiveOfficer v-if="hasVeryHardDifficulty"/>

  <h3 class="mt-4 mb-3">{{t('setupBot.setup.title')}}</h3>
  <div class="instructions">
    <ol>
      <li v-html="t('setupBot.setup.playerPieces')"></li>
      <li v-if="!hasVeryHardDifficulty" v-html="t('setupBot.setup.noExecutiveOfficer')"></li>
      <li v-html="t('setupBot.setup.noStartingContract')"></li>
      <li v-html="t('setupBot.setup.victoryPoints')"></li>
      <li>
        <span v-html="t('setupBot.setup.playerOrder')"></span><br/>
        <svg v-for="playerColor in playerColors" :key="playerColor" width="1.5rem" height="1.5rem" class="color">
          <rect width="1rem" height="1rem" :style="`fill:${getColorCode(playerColor)};'`"/>
        </svg>
      </li>
    </ol>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()" :disabled="!isValid">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import BotCorporation from '@/components/setup/BotCorporation.vue'
import BotExecutiveOfficer from '@/components/setup/BotExecutiveOfficer.vue'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColorCode from '@/util/getPlayerColorCode'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import isCorporationAvailable from '@/util/isCorporationAvailable'
import Expansion from '@/services/enum/Expansion'
import isExecutiveOfficerAvailable from '@/util/isExecutiveOfficerAvailable'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    BotCorporation,
    BotExecutiveOfficer
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
  computed: {
    expansions() : Expansion[] {
      return this.state.setup.expansions
    },
    playerCount() : number {
      return this.state.setup.playerSetup.playerCount
    },
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    },
    playerColors() : PlayerColor[] {
      return this.state.setup.playerSetup.playerColors
        .filter((_color,index) => index < this.playerCount+this.botCount)
    },
    hasVeryHardDifficulty() : boolean {
      for (let botIndex = 0; botIndex<this.botCount; botIndex++) {
        if (this.state.setup.difficultyLevels[botIndex] == DifficultyLevel.VERY_HARD) {
          return true
        }
      }
      return false
    },
    isValid() : boolean {
      for (let botIndex = 0; botIndex<this.botCount; botIndex++) {
        if (!isCorporationAvailable(this.state.setup.botCorporations[botIndex], this.expansions)) {
          return false
        }
        if (this.state.setup.difficultyLevels[botIndex] == DifficultyLevel.VERY_HARD
            && !isExecutiveOfficerAvailable(this.state.setup.botExecutiveOfficers[botIndex], this.expansions)) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    startGame() : void {
      this.$router.push('/turn/1/bot')
    },
    getColorCode(color : PlayerColor) : string {
      return getPlayerColorCode(color)
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
