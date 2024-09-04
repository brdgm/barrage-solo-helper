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
        <PlayerColorIcon v-for="playerColor in playerColors" :key="playerColor" :playerColor="playerColor" class="playerOrderIcon"/>
      </li>
    </ol>
  </div>

  <div class="alert alert-warning" v-if="!isValid" v-html="t('setupBot.validCorporationExecutiveOfficer')"></div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()" :disabled="!isValid">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore, PlayerOrder } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import BotCorporation from '@/components/setup/BotCorporation.vue'
import BotExecutiveOfficer from '@/components/setup/BotExecutiveOfficer.vue'
import PlayerColor from '@/services/enum/PlayerColor'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import isCorporationAvailable from '@/util/isCorporationAvailable'
import Expansion from '@/services/enum/Expansion'
import isExecutiveOfficerAvailable from '@/util/isExecutiveOfficerAvailable'
import Corporation from '@/services/enum/Corporation'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import CardDeck from '@/services/CardDeck'
import hasDifficultyLevel from '@/util/hasDifficultyLevel'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    BotCorporation,
    PlayerColorIcon,
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
      return hasDifficultyLevel(DifficultyLevel.VERY_HARD, this.state)
    },
    isValid() : boolean {
      const selectedCorporations = new Set<Corporation>()
      for (let botIndex = 0; botIndex<this.botCount; botIndex++) {
        const selectedCorporation = this.state.setup.botCorporations[botIndex]
        const selectedExecutiveOfficer = this.state.setup.botExecutiveOfficers[botIndex]
        const difficultyLevel = this.state.setup.difficultyLevels[botIndex]
        if (!isCorporationAvailable(selectedCorporation, this.expansions)) {
          return false
        }
        if (difficultyLevel == DifficultyLevel.VERY_HARD
            && !isExecutiveOfficerAvailable(selectedExecutiveOfficer, this.expansions)) {
          return false
        }
        if (selectedCorporations.has(selectedCorporation)) {
          return false
        }
        selectedCorporations.add(selectedCorporation)
      }
      return true
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      // prepare initial card deck
      this.state.setup.initialCardDeck = CardDeck.new().toPersistence()
      // prepare first round with initial player order
      const { playerCount, botCount } = this.state.setup.playerSetup
      const playerOrder : PlayerOrder[] = []
      for (let botIndex = 0; botIndex<botCount; botIndex++) {
        playerOrder.push({ bot: botIndex+1 })
      }
      for (let playerIndex = 0; playerIndex<playerCount; playerIndex++) {
        playerOrder.push({ player: playerIndex+1 })
      }
      this.state.storeRound({
        round: 1,
        playerOrder,
        turns: []
      })
      // start first turn (skip income in first round)
      this.$router.push('/round/1/start')
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
.playerOrderIcon {
  height: 2.5rem;
  width: 2.5rem;
  filter: drop-shadow(0.15rem 0.15rem 0.15rem #aaa);
  margin-top: 5px;
  margin-right: 10px;
}
</style>
