import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import PlayerColor from '@/services/enum/PlayerColor'
import getPreviousTurns from './getPreviousTurns'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'

export default abstract class AbstractNavigationState {

  readonly playerCount : number
  readonly playerColors : PlayerColor[]
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly botInfos : BotInfo[]

  constructor(route: RouteLocation, state: State) {    
    const setup = state.setup
    this.playerCount = setup.playerSetup.playerCount
    this.playerColors = setup.playerSetup.playerColors
    this.botCount = setup.playerSetup.botCount

    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.botInfos = this.getBotInfos(route, state)
  }

  getBotInfos(route: RouteLocation, state: State) : BotInfo[] {
    const bot = getIntRouteParam(route, 'bot')
    const player = getIntRouteParam(route, 'player')
    const previousTurns = getPreviousTurns({state, round:this.round, turn:this.turn, player, bot})

    const result : BotInfo[] = []
    for (let botNo=1; botNo<=this.botCount; botNo++) {
      const playerColor = this.playerColors[botNo-1] || PlayerColor.BLACK
      // count remaining workers
      const workerCount = Math.max(0, 12 - previousTurns
          .filter(turn => turn.bot == botNo)
          .reduce((sum, turn) => sum + (turn.workerUsed ?? 0), 0))
      result.push({bot:botNo, playerColor, workerCount})
    }
    return result
  }

}

export interface BotInfo {
  bot: number
  playerColor: PlayerColor
  workerCount: number  // remaining workers
}
