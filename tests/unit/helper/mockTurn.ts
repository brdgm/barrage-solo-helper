import CardDeck from '@/services/CardDeck'
import { CardDeckPersistence, Turn } from '@/store/state'

export default function (params?: MockTurnParams) : Turn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    player: params?.player,
    bot: params?.bot,
    cardDeck: params?.cardDeck ?? CardDeck.new().toPersistence(),
    workerUsed: params?.workerUsed ?? 0,
    passed: params?.passed
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  turnOrderIndex? : number
  player?: number
  bot?: number
  cardDeck?: CardDeckPersistence
  workerUsed?: number
  passed?: boolean
}
