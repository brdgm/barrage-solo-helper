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
          playerColors: [PlayerColor.WHITE, PlayerColor.BLACK, PlayerColor.TURQUOISE, PlayerColor.RED]
        },
        difficultyLevels: [DifficultyLevel.NORMAL],
        botCorporations: [],
        botExecutiveOfficers: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.initialCardDeck = undefined
      this.rounds = []
    },
    setupToggleExpansion(expansion: Expansion) {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeTurn(turn : Turn) {
      const round = this.rounds.find(item => item.round == turn.round)
      if (!round) {
        throw new Error(`Round ${turn.round} not found.`)
      }
      round.turns = round.turns.filter(item => (item.turn < turn.turn) || (item.player != turn.player && item.bot != turn.bot))
      round.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  expansions: Expansion[]
  playerSetup: PlayerSetup
  difficultyLevels: DifficultyLevel[] 
  botCorporations: Corporation[]
  botExecutiveOfficers: ExecutiveOfficer[]
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
}

export interface Round {
  round: number
  playerOrder: PlayerOrder[]
  turns: Turn[]
}
export interface PlayerOrder {
  player?: number
  bot?: number
}
export interface Turn {
  round: number
  turn: number
  player?: number
  bot?: number
  cardDeck?: CardDeckPersistence
  workerCount?: number
  passed?: boolean
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
}
