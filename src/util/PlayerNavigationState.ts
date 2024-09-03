import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import PlayerColor from '@/services/enum/PlayerColor'
import AbstractNavigationState from './AbstractNavigationState'

export default class PlayerNavigationState extends AbstractNavigationState {

  readonly player : number
  readonly playerColor : PlayerColor

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.player = parseInt(route.params['player'] as string)
    this.playerColor = this.playerColors[this.botCount + this.player - 1] || PlayerColor.BLACK
  }

}
