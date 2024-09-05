import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import PlayerColor from '@/services/enum/PlayerColor'
import AbstractNavigationState from './AbstractNavigationState'
import CardDeck from '@/services/CardDeck'
import getPreviousTurns from './getPreviousTurns'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import BotActions from '@/services/BotActions'
import { ActionItem } from '@/services/Card'

export default class BotNavigationState extends AbstractNavigationState {

  readonly bot : number
  readonly action : number
  readonly workerUsedPreviousAction? : number
  readonly playerColor : PlayerColor
  readonly workerCount : number
  readonly cardDeck : CardDeck
  readonly botActions : BotActions
  readonly actionItem? : ActionItem

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.bot = getIntRouteParam(route, 'bot')
    this.action = getIntRouteParam(route, 'action')
    this.workerUsedPreviousAction = this.getIntRouteParamIfPresent(route, 'worker')
    this.playerColor = this.playerColors[this.bot - 1] || PlayerColor.BLACK
    this.workerCount = this.botInfos.find(info => info.bot == this.bot)?.workerCount ?? 0
    this.cardDeck = this.getCardDeck(state)

    // draw next card for bot
    const actionCard = this.cardDeck.draw()
    this.botActions = new BotActions(actionCard, this.round, this.bot, state)
    this.actionItem = this.botActions.get(this.action)
  }

  getCardDeck(state : State) : CardDeck {
    const previousTurns = getPreviousTurns({state, round:this.round, turn:this.turn, bot:this.bot})
    for (let i=previousTurns.length-1; i>=0; i--) {
      const turn = previousTurns[i]
      if (turn.cardDeck) {
        return CardDeck.fromPersistence(turn.cardDeck)
      }
    }
    if (state.setup.initialCardDeck) {
      return CardDeck.fromPersistence(state.setup.initialCardDeck)
    }
    return CardDeck.new()
  }

}
