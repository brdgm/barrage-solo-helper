import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import PlayerColor from '@/services/enum/PlayerColor'
import AbstractNavigationState from './AbstractNavigationState'

export default class BotNavigationState extends AbstractNavigationState {

  readonly bot : number
  readonly playerColor : PlayerColor

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.bot = parseInt(route.params['bot'] as string)
    this.playerColor = this.playerColors[this.bot - 1] || PlayerColor.BLACK
  }

}
