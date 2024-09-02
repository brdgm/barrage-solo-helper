import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import Corporation from '@/services/enum/Corporation'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        expansions: [],
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          playerColors: [PlayerColor.BLACK, PlayerColor.WHITE, PlayerColor.TURQUOISE, PlayerColor.RED],
          botCorporations: [],
          botExecutiveOfficers: []
        },
        difficultyLevels: [DifficultyLevel.NORMAL]
      },
      turns: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.initialCardDeck = undefined
      this.turns = []
    },
    setupToggleExpansion(expansion: Expansion) {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeTurn(turn : Turn) {
      this.turns = this.turns.filter(item => item.turn < turn.turn)
      this.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  turns: Turn[]
}
export interface Setup {
  expansions: Expansion[]
  playerSetup: PlayerSetup
  difficultyLevels: DifficultyLevel[] 
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
  botCorporations: Corporation[]
  botExecutiveOfficers: ExecutiveOfficer[]
}

export interface Turn {
  turn: number
  bot?: BotPersistence
}

export interface BotPersistence {
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
