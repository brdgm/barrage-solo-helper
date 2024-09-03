import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import PlayerColor from '@/services/enum/PlayerColor'

export default abstract class AbstractNavigationState {

  readonly playerCount : number
  readonly playerColors : PlayerColor[]
  readonly botCount : number
  readonly round : number
  readonly turn : number

  constructor(route : RouteLocation, state : State) {    
    const setup = state.setup
    this.playerCount = setup.playerSetup.playerCount
    this.playerColors = setup.playerSetup.playerColors
    this.botCount = setup.playerSetup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)
  }

}
