import CardDeck from '@/services/CardDeck'
import { CardDeckPersistence, Turn } from '@/store/state'

export default function (params?: MockTurnParams) : Turn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    player: params?.player,
    bot: params?.bot,
    botData: {
      cardDeck: params?.cardDeck ?? CardDeck.new().toPersistence(),
      remainingWorkers: params?.remainingWorkers ?? 0
    },
    passed: params?.passed
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  player?: number
  bot?: number
  cardDeck?: CardDeckPersistence
  remainingWorkers?: number
  passed?: boolean
}
