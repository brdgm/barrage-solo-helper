import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Tile from '@/services/enum/Tile'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.NORMAL_2
      },
      turns: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.initialCardDeck = undefined
      this.turns = []
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
  difficultyLevel: DifficultyLevel
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}

export interface Turn {
  turn: number
  bot?: BotPersistence
}

export interface BotPersistence {
  cardDeck: CardDeckPersistence
  tiles: TilePersistence[]
  victoryPoints: number
}
export interface TilePersistence {
  tile: Tile
  count: number
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
